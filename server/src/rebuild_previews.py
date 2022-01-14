import shutil
import os
import config
from PIL import Image as Img
from models.base_model import db
from models.image import Image

SEP = config.SEP

PREVIEWS_DIR = config.PREVIEWS_DIR
PREVIEW_SIZE = config.PREVIEW_SIZE

if os.path.isdir(PREVIEWS_DIR):
    shutil.rmtree(PREVIEWS_DIR)

with db.atomic():
    pictures = Image.select()

    for picture in pictures:
        file_path = picture.file

        source = file_path.split(SEP)[-3]
        character = file_path.split(SEP)[-2]
        image = file_path.split(SEP)[-1].split('.')[:-1]
        image = ''.join(image)

        preview_loc = f'{PREVIEWS_DIR}/{source}/{character}'
        preview_image = f'{preview_loc}/{image}.png'

        with Img.open(file_path) as opened:
            width, height = opened.size

            opened.thumbnail(PREVIEW_SIZE, Img.ANTIALIAS)
            
            os.makedirs(preview_loc, exist_ok=True)
            opened.save(preview_image, 'PNG')

        picture.preview = preview_image
        picture.save()
