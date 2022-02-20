import os
import shutil
from PIL import Image as Img

from config import conf
from model.base_model import db
from model.image.entity.image import Image


def is_animated(image: Img.Image) -> bool:
    try:
        return image.is_animated
    except AttributeError:
        return False


def thumbnail_animated(image: Img.Image, save_as: str) -> None:
    frames: list[Img.Image] = []
    for frame in range(1, image.n_frames):
        image.seek(frame)
        new_frame = image.copy()
        new_frame.thumbnail(SAMPLE_SIZE, Img.ANTIALIAS)
        frames.append(new_frame)
    
    frames[0].save(save_as,
        'WEBP',
        save_all=True,
        append_images=frames[1:],
        background = (0, 0, 0, 0))


def thumbnail_static(image: Img.Image, save_as: str) -> None:
    image.thumbnail(SAMPLE_SIZE, Img.ANTIALIAS)
    image.save(save_as, 'WEBP')


def make_thumbnail(image: Img.Image, save_as: str) -> None:
    if is_animated(image):
        thumbnail_animated(image, save_as)

    else:
        thumbnail_static(image, save_as)


SEP = conf.SEP

SAMPLES_DIR = conf.SAMPLES_DIR
SAMPLE_SIZE = conf.SAMPLE_SIZE

if os.path.isdir(SAMPLES_DIR):
    shutil.rmtree(SAMPLES_DIR)

with db.atomic():
    pictures: list[Image] = Image.select()

    for picture in pictures:
        file_path = picture.file

        source = file_path.split(SEP)[-3]
        character = file_path.split(SEP)[-2]
        image = file_path.split(SEP)[-1].split('.')[:-1]
        image = ''.join(image)

        sample_loc = f'{SAMPLES_DIR}{SEP}{source}{SEP}{character}'
        sample_image = f'{sample_loc}{SEP}{image}.webp'

        with Img.open(file_path) as opened:
            os.makedirs(sample_loc, exist_ok=True)

            make_thumbnail(opened, sample_image)

        picture.sample = sample_image
        picture.save()

print()
input('Press any key to continue . . . ')
