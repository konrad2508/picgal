import peewee

from model.base_model import BaseModel
from model.image.entity.image import Image
from model.image.entity.virtual_tag import VirtualTag


class ImageVirtualTag(BaseModel):
    image_id = peewee.ForeignKeyField(Image)
    virtual_tag_id = peewee.ForeignKeyField(VirtualTag)
