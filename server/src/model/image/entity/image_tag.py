import peewee

from model.base_model import BaseModel
from model.image.entity.image import Image
from model.image.entity.tag import Tag


class ImageTag(BaseModel):
    image_id = peewee.ForeignKeyField(Image)
    tag_id = peewee.ForeignKeyField(Tag)
