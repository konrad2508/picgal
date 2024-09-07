import datetime
import glob
import json
import os
import playhouse.migrate as migrate
from pathlib import Path

from PIL import Image as Img
from peewee import SqliteDatabase, DoesNotExist

from config import Config
from datasource.virtual_tags import generate_virtual_tags
from service.rpc.i_rpc_controller_service import IRPCControllerService
from model.image.enum.tag_type import TagType
from model.image.entity.image import Image
from model.image.entity.tag import Tag
from model.image.entity.image_tag import ImageTag
from model.image.entity.image_virtual_tag import ImageVirtualTag
from model.image.entity.virtual_tag import VirtualTag
from model.query.entity.query import Query
from model.rpc.data.sync_database_result import SyncDatabaseResult
from model.rpc.data.config_data import ConfigData
from model.rpc.request.config_request import ConfigRequest


class RPCControllerService(IRPCControllerService):
    def __init__(self, db: SqliteDatabase, cfg: Config) -> None:
        self.db = db
        self.cfg = cfg

    def sync_database(self) -> SyncDatabaseResult:
        def get_file_path(file: str) -> Path:
            return Path(self.cfg.PICTURES_ROOT) / Path(file).relative_to('/')

        def get_preview_path(file: str) -> Path:
            return Path(self.cfg.PREVIEWS_DIR) / Path(file).relative_to('/')

        def get_sample_path(file: str) -> Path:
            return Path(self.cfg.SAMPLES_DIR) / Path(file).relative_to('/')

        def is_animated(image: Img.Image) -> bool:
            try:
                return image.is_animated
            except AttributeError:
                return False

        def thumbnail_animated(image: Img.Image, save_as: Path, size: tuple[int, int]) -> None:
            frames: list[Img.Image] = []
            for frame in range(1, image.n_frames):
                image.seek(frame)
                new_frame = image.copy()
                new_frame.thumbnail(size, Img.LANCZOS)
                frames.append(new_frame)
            
            frames[0].save(save_as,
                'WEBP',
                save_all=True,
                append_images=frames[1:],
                background = (0, 0, 0, 0))

        def thumbnail_static(image: Img.Image, save_as: Path, size: tuple[int, int]) -> None:
            image.thumbnail(size, Img.LANCZOS)
            image.save(save_as, 'WEBP')

        def make_thumbnail(image: Img.Image, save_as: Path, size: tuple[int, int]) -> None:
            if is_animated(image):
                thumbnail_animated(image, save_as, size)

            else:
                thumbnail_static(image, save_as, size)

        def restore_thumbnail(existing_picture: Image, type: str) -> None:
            with Img.open(get_file_path(existing_picture.file)) as opened:
                if type == 'preview':
                    thumbnail_location = get_preview_path(existing_picture.preview)
                    thumbnail_size = self.cfg.PREVIEW_SIZE

                else:
                    thumbnail_location = get_sample_path(existing_picture.sample)
                    thumbnail_size = self.cfg.SAMPLE_SIZE

                thumbnail_location.parent.mkdir(parents=True, exist_ok=True)

                make_thumbnail(opened, thumbnail_location, thumbnail_size)

        def listpop(l: list[object]) -> object | None:
            try:
                return l.pop(0)

            except IndexError:
                return None

        # verify database integrity
        self.db.create_tables([Image, Tag, ImageTag, Query, VirtualTag, ImageVirtualTag], safe=True)

        # check for missing columns
        to_add = []

        image_columns = self.db.get_columns('image')

        # check if encrypted column exists
        # TODO remove in future update
        if not any(column.name == 'encrypted' for column in image_columns):
            to_add.append(('image', 'encrypted', Image.encrypted))
        
        # check if added_time column exists
        # TODO remove in future update
        added_time_column_added = False

        if not any(column.name == 'added_time' for column in image_columns):
            to_add.append(('image', 'added_time', Image.added_time))
            added_time_column_added = True

        # perform migration
        if len(to_add) > 0:
            migrator = migrate.SqliteMigrator(self.db)

            with self.db.atomic():
                migrate.migrate(
                    *[ migrator.add_column(*args) for args in to_add ]
                )

        # added_time: initialize column with values from created_time
        # TODO remove in future update
        if added_time_column_added:
            with self.db.atomic():
                imgs = Image.select()

                for img in imgs:
                    img.added_time = datetime.datetime.utcfromtimestamp(img.created_time)

                Image.bulk_update(imgs, fields=['added_time'], batch_size=50)
        
        # added_time: if that column was missing, then filenames are outdated; assume here that gallery root is up to date
        # TODO remove in future update
        if added_time_column_added:
            with self.db.atomic():
                imgs = Image.select()

                for img in imgs:
                    outdated_filepath = img.file

                    new_file_filepath = outdated_filepath.split(self.cfg.PICTURES_ROOT)[1]

                    new_filepath_pathobj = Path(new_file_filepath)
                    new_preview_filepath = str(new_filepath_pathobj.with_suffix('.webp'))
                    new_sample_filepath = str(new_filepath_pathobj.with_suffix('.webp'))

                    img.file = new_file_filepath
                    img.preview = new_preview_filepath
                    img.sample = new_sample_filepath

                Image.bulk_update(imgs, fields=['file', 'preview', 'sample'], batch_size=50)
        
        # added_time: if that column was missing, then rename absurdres tag to veryhighres
        # TODO remove in future update
        if added_time_column_added:
            with self.db.atomic():
                absurdres_ref: Tag = Tag.get(Tag.name == 'absurdres')

                absurdres_ref.name = 'veryhighres'

                absurdres_ref.save(only=[Tag.name])

        # deleting
        deleted_counter = 0

        existing_pictures: list[Image] = Image.select()

        for existing_picture in existing_pictures:
            if not get_file_path(existing_picture.file).is_file():
                get_preview_path(existing_picture.preview).unlink(missing_ok=True)
                get_sample_path(existing_picture.sample).unlink(missing_ok=True)

                ImageTag.delete().where(ImageTag.image_id == existing_picture.image_id).execute()
                ImageVirtualTag.delete().where(ImageVirtualTag.image_id == existing_picture.image_id).execute()
                existing_picture.delete_instance()

                deleted_counter += 1

        with self.db.atomic():
            # adding new virtual tags
            added_virtual_tags = []

            for virtual_tag in generate_virtual_tags():
                for subtag in virtual_tag.subtags:
                    virtual_tag_obj = {
                        'name': f'{virtual_tag.name}:{subtag.name}'
                    }

                    added_virtual_tags.append(virtual_tag_obj['name'])

                    try:
                        VirtualTag.get(VirtualTag.name == virtual_tag_obj['name'])

                    except DoesNotExist:
                        virtual_tag_obj_ref = VirtualTag.create(**virtual_tag_obj)

                        matching_images = Image.select().where(subtag.condition())

                        to_insert = [ {'image_id': img.image_id, 'virtual_tag_id': virtual_tag_obj_ref.virtual_tag_id} for img in matching_images ]
                        ImageVirtualTag.insert_many(to_insert).execute()

            # removing nonexistent virtual tags
            nonexistent = VirtualTag.select().where(~(VirtualTag.name << added_virtual_tags))
            ImageVirtualTag.delete().where(ImageVirtualTag.virtual_tag_id << nonexistent).execute()

            VirtualTag.delete().where(~(VirtualTag.name << added_virtual_tags)).execute()

            # adding images and restoring previews
            add_counter = 0
            restored_previews_counter = 0
            restored_samples_counter = 0

            pictures = glob.glob(f'{self.cfg.PICTURES_ROOT}/**/*.*', recursive=True)
            # TODO? check if we can deal with incoming file ext

            for picture in pictures:
                picture_file = picture.split(self.cfg.PICTURES_ROOT)[1]

                try:
                    existing_picture: Image = Image.get(Image.file == picture_file)

                    if not get_preview_path(existing_picture.preview).is_file():
                        restore_thumbnail(existing_picture, 'preview')

                        restored_previews_counter += 1

                    if not get_sample_path(existing_picture.sample).is_file():
                        restore_thumbnail(existing_picture, 'sample')

                        restored_samples_counter += 1

                except DoesNotExist:
                    picture_file_pathobj = Path(picture_file)
                    picture_dirs = list(picture_file_pathobj.parts[1:-1])

                    with Img.open(picture) as opened:
                        width, height = opened.size

                        preview_file = picture_file_pathobj.with_suffix('.webp')
                        sample_file = picture_file_pathobj.with_suffix('.webp')
                        
                        preview_loc = Path(self.cfg.PREVIEWS_DIR) / preview_file.relative_to('/')
                        preview_loc.parent.mkdir(parents=True, exist_ok=True)
                        
                        sample_loc = Path(self.cfg.SAMPLES_DIR) / sample_file.relative_to('/')
                        sample_loc.parent.mkdir(parents=True, exist_ok=True)

                        make_thumbnail(opened.copy(), preview_loc, self.cfg.PREVIEW_SIZE)
                        make_thumbnail(opened.copy(), sample_loc, self.cfg.SAMPLE_SIZE)

                    pic = {
                        'file': picture_file,
                        'preview': str(preview_file),
                        'sample': str(sample_file),
                        'width': width,
                        'height': height,
                        'favourite': False,
                        'encrypted': False,
                        'created_time': os.path.getmtime(picture),
                        'added_time': datetime.datetime.utcnow()
                    }

                    img_ref = Image.create(**pic)

                    # high level tag
                    high_tag = listpop(picture_dirs)
                    if high_tag is not None and high_tag.lower() != 'notag':
                        high_tag_obj = {
                            'name': high_tag.lower(),
                            'type': TagType.HIGHLEVEL
                        }

                        high_tag_ref, _ = Tag.get_or_create(**high_tag_obj)
                        ImageTag.create(image_id=img_ref, tag_id=high_tag_ref)

                    # low level tag
                    low_tag = listpop(picture_dirs)
                    if low_tag is not None and low_tag.lower() != 'notag':
                        low_tag_obj = {
                            'name': low_tag.lower(),
                            'type': TagType.LOWLEVEL
                        }

                        gen_tag_ref, _ = Tag.get_or_create(**low_tag_obj)
                        ImageTag.create(image_id=img_ref, tag_id=gen_tag_ref)

                    # general tags (if any)
                    for gen_tag in picture_dirs:
                        gen_tag_obj = {
                            'name': gen_tag.lower(),
                            'type': TagType.GENERAL
                        }

                        gen_tag_ref, _ = Tag.get_or_create(**gen_tag_obj)
                        ImageTag.create(image_id=img_ref, tag_id=gen_tag_ref)

                    # meta tags
                    im_quality = width * height
                    if self.cfg.VERYHIGHRES > 0 and im_quality >= self.cfg.VERYHIGHRES:
                        meta_tag = {
                            'name': 'veryhighres',
                            'type': TagType.META
                        }

                        meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                        ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)

                    elif self.cfg.HIGHRES > 0 and im_quality >= self.cfg.HIGHRES:
                        meta_tag = {
                            'name': 'highres',
                            'type': TagType.META
                        }

                        meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                        ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)

                    # virtual tags
                    for virtual_tag in generate_virtual_tags():
                        for subtag in virtual_tag.subtags:
                            try:
                                Image.select()\
                                    .where(Image.image_id == img_ref)\
                                    .where(subtag.condition())\
                                    .get()

                                virtual_tag_obj = {
                                    'name': f'{virtual_tag.name}:{subtag.name}'
                                }
                                virtual_tag_obj_ref, _ = VirtualTag.get_or_create(**virtual_tag_obj)
                                ImageVirtualTag.create(image_id=img_ref, virtual_tag_id=virtual_tag_obj_ref)

                            except DoesNotExist:
                                continue

                    add_counter += 1

        return SyncDatabaseResult(
            deleted_counter,
            restored_previews_counter,
            restored_samples_counter,
            add_counter
        )

    def get_config(self) -> ConfigData:
        config = ConfigData(
            self.cfg.HIGHRES,
            self.cfg.VERYHIGHRES,
            self.cfg.PICTURES_ROOT,
            self.cfg.PREVIEWS_DIR,
            self.cfg.SAMPLES_DIR,
            self.cfg.COUNT_PER_PAGE,
            self.cfg.HIGH_LEVEL_NAME,
            self.cfg.LOW_LEVEL_NAME,
            self.cfg.GPG_BIN,
            self.cfg.RECIPIENT,
            self.cfg.IMAGE_SAVE_DIR
        )

        return config

    def modify_config(self, modifications: ConfigRequest) -> ConfigData:
        with open(self.cfg._path, 'r+') as cfg_file:
            cfg_content = cfg_file.read()
            cfg = json.loads(cfg_content)

            cfg['highres'] = modifications.highres
            cfg['veryhighres'] = modifications.veryhighres
            cfg['picturesRoot'] = modifications.pictures_root
            cfg['previewsDir'] = modifications.previews_dir
            cfg['samplesDir'] = modifications.samples_dir
            cfg['countPerPage'] = modifications.count_per_page
            cfg['highLevelName'] = modifications.high_level_name
            cfg['lowLevelName'] = modifications.low_level_name
            cfg['gpgBin'] = modifications.gpg_bin
            cfg['recipient'] = modifications.recipient
            cfg['imageSaveDir'] = modifications.image_save_dir

            cfg_file.seek(0)
            json.dump(cfg, cfg_file, indent=4)
            cfg_file.truncate()
        
        self.cfg.HIGHRES = modifications.highres
        self.cfg.VERYHIGHRES = modifications.veryhighres
        self.cfg.PICTURES_ROOT = modifications.pictures_root
        self.cfg.PREVIEWS_DIR = modifications.previews_dir
        self.cfg.SAMPLES_DIR = modifications.samples_dir
        self.cfg.COUNT_PER_PAGE = modifications.count_per_page
        self.cfg.HIGH_LEVEL_NAME = modifications.high_level_name
        self.cfg.LOW_LEVEL_NAME = modifications.low_level_name
        self.cfg.GPG_BIN = modifications.gpg_bin
        self.cfg.RECIPIENT = modifications.recipient
        self.cfg.IMAGE_SAVE_DIR = modifications.image_save_dir

        new_config = ConfigData(
            modifications.highres,
            modifications.veryhighres,
            modifications.pictures_root,
            modifications.previews_dir,
            modifications.samples_dir,
            modifications.count_per_page,
            modifications.high_level_name,
            modifications.low_level_name,
            modifications.gpg_bin,
            modifications.recipient,
            modifications.image_save_dir
        )

        return new_config
