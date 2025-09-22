import datetime
import glob
import io
import json
import os
import subprocess
from collections import defaultdict
from pathlib import Path

import imagehash
import pillow_avif
import playhouse.migrate as migrate
from PIL import Image as Img
from PIL import UnidentifiedImageError
from peewee import SqliteDatabase, DoesNotExist

from config import Config
from datasource.virtual_tags import generate_virtual_tags
from service.rpc.i_rpc_controller_service import IRPCControllerService
from model.image.enum.tag_type import TagType
from model.image.enum.view_encrypted import ViewEncrypted
from model.image.entity.image import Image
from model.image.entity.tag import Tag
from model.image.entity.image_tag import ImageTag
from model.image.entity.image_virtual_tag import ImageVirtualTag
from model.image.entity.virtual_tag import VirtualTag
from model.query.entity.query import Query
from model.rpc.data.authenticate_result import AuthenticateResult
from model.rpc.data.scan_result import ScanResult
from model.rpc.data.sync_database_result import SyncDatabaseResult
from model.rpc.data.config_data import ConfigData
from model.rpc.object.scan_picture import ScanPicture
from model.rpc.request.config_request import ConfigRequest
from model.rpc.request.scan_request import ScanRequest


class RPCControllerService(IRPCControllerService):
    def __init__(self, db: SqliteDatabase, cfg: Config) -> None:
        self.db = db
        self.cfg = cfg

        self.VALID_EXTENSIONS = [
            # png
            '.png',

            # jpg
            '.jpg', '.jpeg',

            # webp
            '.webp',

            # gif
            '.gif',

            # bmp
            '.bmp',

            # avif
            '.avif', '.avifs',
        ]

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
            for frame in range(0, image.n_frames):
                image.seek(frame)
                new_frame = image.copy()
                new_frame.thumbnail(size, Img.LANCZOS)
                frames.append(new_frame)

            frames[0].save(save_as,
                'WEBP',
                save_all=True,
                append_images=frames[1:],
                background = (0, 0, 0, 0))

            image.seek(0)

        def thumbnail_static(image: Img.Image, save_as: Path, size: tuple[int, int]) -> None:
            thumb = image.copy()
            thumb.thumbnail(size, Img.LANCZOS)
            thumb.save(save_as, 'WEBP')

        def make_thumbnail(image: Img.Image, save_as: Path, size: tuple[int, int]) -> None:
            if is_animated(image):
                thumbnail_animated(image, save_as, size)

            else:
                thumbnail_static(image, save_as, size)

        def restore_thumbnail(existing_picture: Image, type: str) -> None:
            if type == 'preview':
                thumbnail_location = get_preview_path(existing_picture.preview)
                thumbnail_size = self.cfg.PREVIEW_SIZE

            else:
                thumbnail_location = get_sample_path(existing_picture.sample)
                thumbnail_size = self.cfg.SAMPLE_SIZE

            thumbnail_location.parent.mkdir(parents=True, exist_ok=True)

            img = get_file_path(existing_picture.file)

            if existing_picture.encrypted:
                img = io.BytesIO(decrypt_file(str(img)))

            with Img.open(img) as opened:
                make_thumbnail(opened, thumbnail_location, thumbnail_size)

            if existing_picture.encrypted:
                try:
                    encrypted = encrypt_file(str(thumbnail_location))

                    with open(thumbnail_location, 'wb') as f:
                        f.write(encrypted)

                except Exception as e:
                    thumbnail_location.unlink()

                    raise e

        def encrypt_file(path: str) -> bytes:
            file = subprocess.check_output([self.cfg.GPG_BIN, '-o', '-', '-er', self.cfg.RECIPIENT, path])

            return file
    
        def decrypt_file(path: str) -> bytes:
            file = subprocess.check_output([self.cfg.GPG_BIN, '-qd', path])

            return file

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

        # example of checking if a column exists
        if not any(column.name == 'file' for column in image_columns):
            to_add.append(('image', 'file', Image.file))

        # perform migration
        if len(to_add) > 0:
            migrator = migrate.SqliteMigrator(self.db)

            with self.db.atomic():
                migrate.migrate(
                    *[ migrator.add_column(*args) for args in to_add ]
                )

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

            for picture in pictures:
                picture_file = picture.split(self.cfg.PICTURES_ROOT)[1]
                picture_file_pathobj = Path(picture_file)

                if picture_file_pathobj.suffix not in self.VALID_EXTENSIONS:
                    continue

                try:
                    existing_picture: Image = Image.get(Image.file == picture_file)

                    if not get_preview_path(existing_picture.preview).is_file():
                        try:
                            restore_thumbnail(existing_picture, 'preview')
                            restored_previews_counter += 1
                        except:
                            pass

                    if not get_sample_path(existing_picture.sample).is_file():
                        try:
                            restore_thumbnail(existing_picture, 'sample')
                            restored_samples_counter += 1
                        except:
                            pass

                except DoesNotExist:
                    picture_dirs = list(picture_file_pathobj.parts[1:-1])

                    try:
                        with Img.open(picture) as opened:
                            # ignore apng disguised as png because it cannot be converted to webp thumbnail
                            if picture_file_pathobj.suffix == '.png' and opened.is_animated:
                                continue

                            width, height = opened.size

                            avg_hash = imagehash.average_hash(opened)
                            p_hash = imagehash.phash(opened)
                            d_hash = imagehash.dhash(opened)
                            w_hash = imagehash.whash(opened)

                            preview_file = picture_file_pathobj.with_suffix('.webp')
                            sample_file = picture_file_pathobj.with_suffix('.webp')
                            
                            preview_loc = Path(self.cfg.PREVIEWS_DIR) / preview_file.relative_to('/')
                            preview_loc.parent.mkdir(parents=True, exist_ok=True)
                            
                            sample_loc = Path(self.cfg.SAMPLES_DIR) / sample_file.relative_to('/')
                            sample_loc.parent.mkdir(parents=True, exist_ok=True)

                            make_thumbnail(opened, preview_loc, self.cfg.PREVIEW_SIZE)
                            make_thumbnail(opened, sample_loc, self.cfg.SAMPLE_SIZE)

                    except UnidentifiedImageError:
                        continue

                    pic = {
                        'file': picture_file,
                        'preview': str(preview_file),
                        'sample': str(sample_file),
                        'width': width,
                        'height': height,
                        'favourite': False,
                        'encrypted': False,
                        'created_time': os.path.getmtime(picture),
                        'added_time': datetime.datetime.utcnow(),
                        'avg_hash': str(avg_hash),
                        'p_hash': str(p_hash),
                        'd_hash': str(d_hash),
                        'w_hash': str(w_hash)
                    }

                    img_ref = Image.create(**pic)

                    # high level tag
                    high_tag = listpop(picture_dirs)
                    if high_tag is not None and high_tag.lower() != self.cfg.NOTAG_DIR:
                        high_tag_obj = {
                            'name': high_tag.lower(),
                            'type': TagType.HIGHLEVEL
                        }

                        high_tag_ref, _ = Tag.get_or_create(**high_tag_obj)
                        ImageTag.create(image_id=img_ref, tag_id=high_tag_ref)

                    # low level tag
                    low_tag = listpop(picture_dirs)
                    if low_tag is not None and low_tag.lower() != self.cfg.NOTAG_DIR:
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
            self.cfg.SAVE_DIR
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
            cfg['saveDir'] = modifications.save_dir

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
        self.cfg.SAVE_DIR = modifications.save_dir

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
            modifications.save_dir
        )

        return new_config

    def scan_directory_for_duplicates(self, scan_request: ScanRequest, view_encrypted: ViewEncrypted) -> ScanResult:
        def get_pics_from_dir(directory: str) -> list[ScanPicture]:
            pictures = glob.glob(f'{directory}/**/*.*', recursive=True)

            pics = []
            for pic in pictures:
                if Path(pic).suffix not in self.VALID_EXTENSIONS:
                    continue
                
                try:
                    with Img.open(pic) as pic_content:
                        pics.append(ScanPicture(
                            path=pic,
                            avg_hash=imagehash.average_hash(pic_content),
                            p_hash=imagehash.phash(pic_content),
                            d_hash=imagehash.dhash(pic_content),
                            w_hash=imagehash.whash(pic_content)
                        ))

                except UnidentifiedImageError:
                    continue
            
            return pics

        def get_pics_from_db() -> list[ScanPicture]:
            pics = Image.select(Image.file, Image.avg_hash, Image.p_hash, Image.d_hash, Image.w_hash)

            if view_encrypted != ViewEncrypted.YES:
                pics = pics.where(Image.encrypted == False)

            pics = [
                ScanPicture(
                    path=str(Path(self.cfg.PICTURES_ROOT) / Path(p.file).relative_to('/')),
                    avg_hash=imagehash.hex_to_hash(p.avg_hash),
                    p_hash=imagehash.hex_to_hash(p.p_hash),
                    d_hash=imagehash.hex_to_hash(p.d_hash),
                    w_hash=imagehash.hex_to_hash(p.w_hash)
                ) for p in pics
            ]

            return pics


        scanned_pics = get_pics_from_dir(scan_request.scan_dir)
        base_pics = get_pics_from_db() if scan_request.base_dir == '' else get_pics_from_dir(scan_request.base_dir)

        # assume duplicates have the exact same hash (of at least one type)
        avg_hashes = defaultdict(set)
        p_hashes = defaultdict(set)
        d_hashes = defaultdict(set)
        w_hashes = defaultdict(set)

        for scn_pic in scanned_pics:
            avg_hashes[scn_pic.avg_hash].add(scn_pic.path)
            p_hashes[scn_pic.p_hash].add(scn_pic.path)
            d_hashes[scn_pic.d_hash].add(scn_pic.path)
            w_hashes[scn_pic.w_hash].add(scn_pic.path)
        
        for bas_pic in base_pics:
            avg_hashes[bas_pic.avg_hash].add(bas_pic.path)  if bas_pic.avg_hash in avg_hashes else ...
            p_hashes[bas_pic.p_hash].add(bas_pic.path)      if bas_pic.p_hash in p_hashes else ...
            d_hashes[bas_pic.d_hash].add(bas_pic.path)      if bas_pic.d_hash in d_hashes else ...
            w_hashes[bas_pic.w_hash].add(bas_pic.path)      if bas_pic.w_hash in w_hashes else ...

        dupes = { tuple(sorted(v)) for hashes in [ avg_hashes, p_hashes, d_hashes, w_hashes ] for _, v in hashes.items() if len(v) > 1 }
        dupes = list(dupes)

        output = Path(scan_request.out_dir) / 'Picgal_dupescan_result.json'
        output.parent.mkdir(parents=True, exist_ok=True)

        with output.open('w') as f:
            json.dump(dupes, f, indent=4)

        return ScanResult(str(output))

    def authenticate(self) -> AuthenticateResult:
        return AuthenticateResult(self._is_gpg_password_correct())

    def _is_gpg_password_correct(self) -> bool:
        try:
            encoded = subprocess.check_output([self.cfg.GPG_BIN, '-er', self.cfg.RECIPIENT], input=b'random message')
            subprocess.check_output([self.cfg.GPG_BIN, '-qd'], input=encoded)

            return True

        except:
            return False
