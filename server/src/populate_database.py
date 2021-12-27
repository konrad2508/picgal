import sys
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

root = sys.argv[1]

pictures = glob.glob(f'{root}/*/*/*')

db.create_tables([Image, Tag, ImageTag], safe=True)

with db.atomic():
    for picture in pictures:
        try:
            Image.get(Image.file == picture)

        except DoesNotExist:
            source = picture.split(SEP)[-3]
            character = picture.split(SEP)[-2]
            image = picture.split(SEP)[-1].split('.')[:-1]
            image = ''.join(image)

            preview_loc = f'{PREVIEWS_DIR}/{source}/{character}'

            with Img.open(picture) as opened:
                width, height = opened.size

                opened.thumbnail(PREVIEW_SIZE, Img.ANTIALIAS)
                
                os.makedirs(preview_loc, exist_ok=True)
                opened.save(f'{preview_loc}/{image}.png', 'PNG')

            pic = {
                'file': picture,
                'preview': f'{preview_loc}/{image}.png',
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
