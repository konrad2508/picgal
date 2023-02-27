import glob
import os

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
                new_frame.thumbnail(size, Img.ANTIALIAS)
                frames.append(new_frame)
            
            frames[0].save(save_as,
                'WEBP',
                save_all=True,
                append_images=frames[1:],
                background = (0, 0, 0, 0))


        def thumbnail_static(image: Img.Image, save_as: str, size: tuple[int, int]) -> None:
            image.thumbnail(size, Img.ANTIALIAS)
            image.save(save_as, 'WEBP')


        def make_thumbnail(image: Img.Image, save_as: str, size: tuple[int, int]) -> None:
            if is_animated(image):
                thumbnail_animated(image, save_as, size)

            else:
                thumbnail_static(image, save_as, size)


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

        self.db.create_tables([Image, Tag, ImageTag, Query], safe=True)

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

        # adding images and restoring previews
        add_counter = 0
        restored_previews_counter = 0
        restored_samples_counter = 0

        pictures = glob.glob(f'{ROOT}/*/*/*')

        for picture in pictures:
            try:
                existing_picture: Image = Image.get(Image.file == picture)

                if not os.path.isfile(existing_picture.preview):
                    with Img.open(existing_picture.file) as opened:
                        preview_parent_dir = SEP.join(existing_picture.preview.split(SEP)[:-1])
                        os.makedirs(preview_parent_dir, exist_ok=True)

                        make_thumbnail(opened, existing_picture.preview, PREVIEW_SIZE)

                    restored_previews_counter += 1

                if not os.path.isfile(existing_picture.sample):
                    with Img.open(existing_picture.file) as opened:
                        sample_parent_dir = SEP.join(existing_picture.sample.split(SEP)[:-1])
                        os.makedirs(sample_parent_dir, exist_ok=True)

                        make_thumbnail(opened, existing_picture.sample, SAMPLE_SIZE)

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
