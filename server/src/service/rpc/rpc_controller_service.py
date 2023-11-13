import glob
import json
import os
import playhouse.migrate as migrate

from PIL import Image as Img
from peewee import SqliteDatabase, DoesNotExist

from config import Config
from service.rpc.i_rpc_controller_service import IRPCControllerService
from model.image.enum.tag_type import TagType
from model.image.entity.image import Image
from model.image.entity.tag import Tag
from model.image.entity.image_tag import ImageTag
from model.query.entity.query import Query
from model.rpc.data.sync_database_result import SyncDatabaseResult
from model.rpc.data.config_data import ConfigData
from model.rpc.request.config_request import ConfigRequest


class RPCControllerService(IRPCControllerService):
    def __init__(self, db: SqliteDatabase, cfg: Config) -> None:
        self.db = db
        self.cfg = cfg

    def sync_database(self) -> SyncDatabaseResult:
        def is_animated(image: Img.Image) -> bool:
            try:
                return image.is_animated
            except AttributeError:
                return False


        def thumbnail_animated(image: Img.Image, save_as: str, size: tuple[int, int]) -> None:
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


        def thumbnail_static(image: Img.Image, save_as: str, size: tuple[int, int]) -> None:
            image.thumbnail(size, Img.LANCZOS)
            image.save(save_as, 'WEBP')


        def make_thumbnail(image: Img.Image, save_as: str, size: tuple[int, int]) -> None:
            if is_animated(image):
                thumbnail_animated(image, save_as, size)

            else:
                thumbnail_static(image, save_as, size)


        def restore_thumbnail(existing_picture: Image, type: str) -> None:
            with Img.open(existing_picture.file) as opened:
                if type == 'preview':
                    new_thumbnail_location = SEP.join([self.cfg.PREVIEWS_DIR, *existing_picture.preview.split(SEP)[-3:]])
                    existing_picture.preview = new_thumbnail_location
                    thumbnail_size = PREVIEW_SIZE

                else:
                    new_thumbnail_location = SEP.join([self.cfg.SAMPLES_DIR, *existing_picture.sample.split(SEP)[-3:]])
                    existing_picture.sample = new_thumbnail_location
                    thumbnail_size = SAMPLE_SIZE

                preview_parent_dir = SEP.join(new_thumbnail_location.split(SEP)[:-1])
                os.makedirs(preview_parent_dir, exist_ok=True)

                make_thumbnail(opened, new_thumbnail_location, thumbnail_size)

                existing_picture.save()


        SEP = self.cfg.SEP
        HIGHRES = self.cfg.HIGHRES
        ABSURDRES = self.cfg.ABSURDRES

        PREVIEWS_DIR = self.cfg.PREVIEWS_DIR
        PREVIEW_SIZE = self.cfg.PREVIEW_SIZE

        SAMPLES_DIR = self.cfg.SAMPLES_DIR
        SAMPLE_SIZE = self.cfg.SAMPLE_SIZE

        # STRUCTURE
        # /<ROOT>/<SOURCE>/<CHARACTER>/<image>

        ROOT = self.cfg.PICTURES_ROOT

        # verify database integrity
        self.db.create_tables([Image, Tag, ImageTag, Query], safe=True)

        # check for missing columns
        to_add = []

        # check if encrypted column exists
        image_columns = self.db.get_columns('image')
        if not any(column.name == 'encrypted' for column in image_columns):
            to_add.append(('image', 'encrypted', Image.encrypted))
        
        # perform migration
        if len(to_add) > 0:
            migrator = migrate.SqliteMigrator(self.db)

            with self.db.atomic():
                migrate.migrate(
                    *[ migrator.add_column(*args) for args in to_add ]
                )

        with self.db.atomic():
            # syncing root
            existing_pictures: list[Image] = list(Image.select())

            if len(existing_pictures) > 0:
                example_pic = existing_pictures[0]
                old_root = SEP.join(example_pic.file.split(SEP)[:-3])

                if old_root != ROOT:
                    for existing_picture in existing_pictures:
                        picture_path = SEP.join(existing_picture.file.split(SEP)[-3:])

                        existing_picture.file = f'{ROOT}{SEP}{picture_path}'
                        existing_picture.save()

        # deleting
        deleted_counter = 0

        existing_pictures: list[Image] = Image.select()

        for existing_picture in existing_pictures:
            if not os.path.isfile(existing_picture.file):
                if os.path.isfile(existing_picture.preview):
                    os.remove(existing_picture.preview)
                
                if os.path.isfile(existing_picture.sample):
                    os.remove(existing_picture.sample)
                
                ImageTag.delete().where(ImageTag.image_id == existing_picture.image_id).execute()
                existing_picture.delete_instance()

                deleted_counter += 1
        
        with self.db.atomic():
            # adding images and restoring previews
            add_counter = 0
            restored_previews_counter = 0
            restored_samples_counter = 0

            pictures = glob.glob(f'{ROOT}/*/*/*')

            for picture in pictures:
                try:
                    existing_picture: Image = Image.get(Image.file == picture)

                    if not os.path.isfile(existing_picture.preview) or not self.cfg.PREVIEWS_DIR == SEP.join(existing_picture.preview.split(SEP)[:-3]):
                        restore_thumbnail(existing_picture, 'preview')

                        restored_previews_counter += 1

                    if not os.path.isfile(existing_picture.sample) or not self.cfg.SAMPLES_DIR == SEP.join(existing_picture.sample.split(SEP)[:-3]):
                        restore_thumbnail(existing_picture, 'sample')

                        restored_samples_counter += 1

                except DoesNotExist:
                    source = picture.split(SEP)[-3]
                    character = picture.split(SEP)[-2]
                    image = ''.join(picture.split(SEP)[-1].split('.')[:-1])

                    preview_loc = f'{PREVIEWS_DIR}{SEP}{source}{SEP}{character}'
                    sample_loc = f'{SAMPLES_DIR}{SEP}{source}{SEP}{character}'

                    if source.lower() == character.lower() == 'none':
                        continue

                    with Img.open(picture) as opened:
                        width, height = opened.size
                        preview_file = f'{preview_loc}{SEP}{image}.webp'
                        sample_file = f'{sample_loc}{SEP}{image}.webp'

                        os.makedirs(preview_loc, exist_ok=True)
                        os.makedirs(sample_loc, exist_ok=True)

                        make_thumbnail(opened.copy(), preview_file, PREVIEW_SIZE)
                        make_thumbnail(opened.copy(), sample_file, SAMPLE_SIZE)

                    pic = {
                        'file': picture,
                        'preview': preview_file,
                        'sample': sample_file,
                        'width': width,
                        'height': height,
                        'favourite': False,
                        'encrypted': False,
                        'created_time': os.path.getmtime(picture)
                    }

                    img_ref = Image.create(**pic)

                    if source.lower() != 'none':
                        source_tag = {
                            'name': source.lower(),
                            'type': TagType.SOURCE
                        }

                        src_tag_ref, _ = Tag.get_or_create(**source_tag)
                        ImageTag.create(image_id=img_ref, tag_id=src_tag_ref)

                    if character.lower() != 'none':
                        character_tag = {
                            'name': character.lower(),
                            'type': TagType.CHARACTER
                        }

                        char_tag_ref, _ = Tag.get_or_create(**character_tag)
                        ImageTag.create(image_id=img_ref, tag_id=char_tag_ref)

                    im_quality = width * height
                    if ABSURDRES > 0 and im_quality >= ABSURDRES:
                        meta_tag = {
                            'name': 'absurdres',
                            'type': TagType.META
                        }

                        meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                        ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)

                    elif HIGHRES > 0 and im_quality >= HIGHRES:
                        meta_tag = {
                            'name': 'highres',
                            'type': TagType.META
                        }

                        meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                        ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)

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
            self.cfg.ABSURDRES,
            self.cfg.PICTURES_ROOT,
            self.cfg.PREVIEWS_DIR,
            self.cfg.SAMPLES_DIR,
            self.cfg.COUNT_PER_PAGE,
            self.cfg.HIGH_LEVEL_NAME,
            self.cfg.LOW_LEVEL_NAME,
            self.cfg.GPG_BIN,
            self.cfg.RECIPIENT
        )

        return config

    def modify_config(self, modifications: ConfigRequest) -> ConfigData:
        with open(self.cfg._path, 'r+') as cfg_file:
            cfg_content = cfg_file.read()
            cfg = json.loads(cfg_content)

            cfg['highres'] = modifications.highres
            cfg['absurdres'] = modifications.absurdres
            cfg['picturesRoot'] = modifications.pictures_root
            cfg['previewsDir'] = modifications.previews_dir
            cfg['samplesDir'] = modifications.samples_dir
            cfg['countPerPage'] = modifications.count_per_page
            cfg['highLevelName'] = modifications.high_level_name
            cfg['lowLevelName'] = modifications.low_level_name
            cfg['gpgBin'] = modifications.gpg_bin
            cfg['recipient'] = modifications.recipient

            cfg_file.seek(0)
            json.dump(cfg, cfg_file, indent=4)
            cfg_file.truncate()
        
        self.cfg.HIGHRES = modifications.highres
        self.cfg.ABSURDRES = modifications.absurdres
        self.cfg.PICTURES_ROOT = modifications.pictures_root
        self.cfg.PREVIEWS_DIR = modifications.previews_dir
        self.cfg.SAMPLES_DIR = modifications.samples_dir
        self.cfg.COUNT_PER_PAGE = modifications.count_per_page
        self.cfg.HIGH_LEVEL_NAME = modifications.high_level_name
        self.cfg.LOW_LEVEL_NAME = modifications.low_level_name
        self.cfg.GPG_BIN = modifications.gpg_bin
        self.cfg.RECIPIENT = modifications.recipient

        new_config = ConfigData(
            modifications.highres,
            modifications.absurdres,
            modifications.pictures_root,
            modifications.previews_dir,
            modifications.samples_dir,
            modifications.count_per_page,
            modifications.high_level_name,
            modifications.low_level_name,
            modifications.gpg_bin,
            modifications.recipient
        )

        return new_config
