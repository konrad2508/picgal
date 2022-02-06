import shutil
import os
import config
from PIL import Image as Img
from models.base_model import db
from models.image.image import Image

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

        preview_loc = f'{PREVIEWS_DIR}{SEP}{source}{SEP}{character}'
        preview_image = f'{preview_loc}{SEP}{image}.webp'

        with Img.open(file_path) as opened:
            os.makedirs(preview_loc, exist_ok=True)

            make_thumbnail(opened, preview_image)

        picture.preview = preview_image
        picture.save()

print()
input('Press any key to continue . . . ')
