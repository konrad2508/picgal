import glob
import os
from PIL import Image as Img
from peewee import DoesNotExist
import config
from models.base_model import db
from models.image import Image
from models.tag import Tag
from models.tag_types import TAG_TYPE
from models.image_tag import ImageTag

SEP = config.SEP
HIGHRES = config.HIGHRES
ABSURDRES = config.ABSURDRES

PREVIEWS_DIR = config.PREVIEWS_DIR
PREVIEW_SIZE = config.PREVIEW_SIZE

# STRUCTURE
# /<ROOT>/<SOURCE>/<CHARACTER>/<image>

ROOT = config.PICTURES_ROOT

pictures = glob.glob(f'{ROOT}/*/*/*')

db.create_tables([Image, Tag, ImageTag], safe=True)

with db.atomic():
    # syncing root
    existing_pictures = list(Image.select())

    example_pic = existing_pictures[0]
    old_root = SEP.join(example_pic.file.split(SEP)[:-3])

    if old_root != ROOT:

        for existing_picture in existing_pictures:
            picture_path = SEP.join(existing_picture.file.split(SEP)[-3:])

            existing_picture.file = f'{ROOT}/{picture_path}'
            existing_picture.save()

        print("Synchronized the gallery's root")

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
    
    print(f'Removed {deleted_counter} images')

    # adding images and restoring previews
    add_counter = 0
    restored_counter = 0

    for picture in pictures:
        try:
            existing_picture = Image.get(Image.file == picture)

            if not os.path.isfile(existing_picture.preview):

                with Img.open(existing_picture.file) as opened:
                    opened.thumbnail(PREVIEW_SIZE, Img.ANTIALIAS)

                    preview_parent_dir = SEP.join(existing_picture.preview.split(SEP)[:-1])
                    os.makedirs(preview_parent_dir, exist_ok=True)
                    opened.save(existing_picture.preview, 'WEBP')

                    restored_counter += 1

        except DoesNotExist:
            source = picture.split(SEP)[-3]
            character = picture.split(SEP)[-2]
            image = ''.join(picture.split(SEP)[-1].split('.')[:-1])

            preview_loc = f'{PREVIEWS_DIR}/{source}/{character}'

            with Img.open(picture) as opened:
                width, height = opened.size

                opened.thumbnail(PREVIEW_SIZE, Img.ANTIALIAS)
                
                os.makedirs(preview_loc, exist_ok=True)
                opened.save(f'{preview_loc}/{image}.webp', 'WEBP')

            pic = {
                'file': picture,
                'preview': f'{preview_loc}/{image}.webp',
                'width': width,
                'height': height,
                'favourite': False,
                'created_time': os.path.getmtime(picture)
            }

            source_tag = {
                'name': source.lower(),
                'type': TAG_TYPE['source']
            }

            character_tag = {
                'name': character.lower(),
                'type': TAG_TYPE['character']
            }

            img_ref = Image.create(**pic)

            src_tag_ref, _ = Tag.get_or_create(**source_tag)
            ImageTag.create(image_id=img_ref, tag_id=src_tag_ref)

            char_tag_ref, _ = Tag.get_or_create(**character_tag)
            ImageTag.create(image_id=img_ref, tag_id=char_tag_ref)

            im_quality = width * height
            if im_quality >= ABSURDRES:
                meta_tag = {
                    'name': 'absurdres',
                    'type': TAG_TYPE['meta']
                }

                meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)

            elif im_quality >= HIGHRES:
                meta_tag = {
                    'name': 'highres',
                    'type': TAG_TYPE['meta']
                }

                meta_tag_ref, _ = Tag.get_or_create(**meta_tag)
                ImageTag.create(image_id=img_ref, tag_id=meta_tag_ref)
            
            add_counter += 1
    
    print(f'Restored {restored_counter} previews')
    print(f'Added {add_counter} images')

print()
input('Press any key to continue . . . ')
