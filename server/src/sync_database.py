import glob
import os
from PIL import Image as Img
from peewee import DoesNotExist
import config
from models.base_model import db
from models.image import Image
from models.tag import Tag
from models.image_tag import ImageTag
from enums.tag_types import TAG_TYPE

def is_animated(image):
    try:
        return image.is_animated
    except AttributeError:
        return False

def thumbnail_animated(image, save_as):
    frames = []
    for frame in range(1, image.n_frames):
        image.seek(frame)
        new_frame = image.copy()
        new_frame.thumbnail(PREVIEW_SIZE, Img.ANTIALIAS)
        frames.append(new_frame)
    
    frames[0].save(save_as,
        'WEBP',
        save_all=True,
        append_images=frames[1:],
        background = (0, 0, 0, 0))

def thumbnail_static(image, save_as):
    image.thumbnail(PREVIEW_SIZE, Img.ANTIALIAS)
    image.save(save_as, 'WEBP')

def make_thumbnail(image, save_as):
    if is_animated(image):
        thumbnail_animated(image, save_as)

    else:
        thumbnail_static(image, save_as)

SEP = config.SEP
HIGHRES = config.HIGHRES
ABSURDRES = config.ABSURDRES

PREVIEWS_DIR = config.PREVIEWS_DIR
PREVIEW_SIZE = config.PREVIEW_SIZE

# STRUCTURE
# /<ROOT>/<SOURCE>/<CHARACTER>/<image>

ROOT = config.PICTURES_ROOT

db.create_tables([Image, Tag, ImageTag], safe=True)

with db.atomic():
    # syncing root
    existing_pictures = list(Image.select())

    example_pic = existing_pictures[0]
    old_root = SEP.join(example_pic.file.split(SEP)[:-3])

    if old_root != ROOT:
        for existing_picture in existing_pictures:
            picture_path = SEP.join(existing_picture.file.split(SEP)[-3:])

            existing_picture.file = f'{ROOT}{SEP}{picture_path}'
            existing_picture.save()

        print("[INFO] Synchronized the gallery's root")

    # deleting
    deleted_counter = 0

    existing_pictures = Image.select()

    for existing_picture in existing_pictures:
        if not os.path.isfile(existing_picture.file):
            if os.path.isfile(existing_picture.preview):
                os.remove(existing_picture.preview)
            
            ImageTag.delete().where(ImageTag.image_id == existing_picture.image_id).execute()
            existing_picture.delete_instance()

            deleted_counter += 1
    
    print(f'[INFO] Removed {deleted_counter} images')

    # adding images and restoring previews
    add_counter = 0
    restored_counter = 0

    pictures = glob.glob(f'{ROOT}/*/*/*')

    for picture in pictures:
        try:
            existing_picture = Image.get(Image.file == picture)

            if not os.path.isfile(existing_picture.preview):
                with Img.open(existing_picture.file) as opened:
                    preview_parent_dir = SEP.join(existing_picture.preview.split(SEP)[:-1])
                    os.makedirs(preview_parent_dir, exist_ok=True)

                    make_thumbnail(opened, existing_picture.preview)

                restored_counter += 1

        except DoesNotExist:
            source = picture.split(SEP)[-3]
            character = picture.split(SEP)[-2]
            image = ''.join(picture.split(SEP)[-1].split('.')[:-1])

            preview_loc = f'{PREVIEWS_DIR}{SEP}{source}{SEP}{character}'

            if source.lower() == character.lower() == 'none':
                print(f'[ERROR] Picture {picture} is unsearchable, skipping...')
                continue

            with Img.open(picture) as opened:
                width, height = opened.size
                preview_file = f'{preview_loc}{SEP}{image}.webp'

                os.makedirs(preview_loc, exist_ok=True)

                make_thumbnail(opened, preview_file)

            pic = {
                'file': picture,
                'preview': preview_file,
                'width': width,
                'height': height,
                'favourite': False,
                'created_time': os.path.getmtime(picture)
            }

            img_ref = Image.create(**pic)

            if source.lower() != 'none':
                source_tag = {
                    'name': source.lower(),
                    'type': TAG_TYPE['source']
                }

                src_tag_ref, _ = Tag.get_or_create(**source_tag)
                ImageTag.create(image_id=img_ref, tag_id=src_tag_ref)

            if character.lower() != 'none':
                character_tag = {
                    'name': character.lower(),
                    'type': TAG_TYPE['character']
                }

                char_tag_ref, _ = Tag.get_or_create(**character_tag)
                ImageTag.create(image_id=img_ref, tag_id=char_tag_ref)

            im_quality = width * height
            if ABSURDRES > 0 and im_quality >= ABSURDRES:
                meta_tag = {
                    'name': 'absurdres',
                    'type': TAG_TYPE['meta']
                }

                meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)

            elif HIGHRES > 0 and im_quality >= HIGHRES:
                meta_tag = {
                    'name': 'highres',
                    'type': TAG_TYPE['meta']
                }

                meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)
            
            add_counter += 1
    
    print(f'[INFO] Restored {restored_counter} previews')
    print(f'[INFO] Added {add_counter} images')

print()
input('Press any key to continue . . . ')
