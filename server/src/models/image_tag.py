import peewee
from models.base_model import BaseModel
from models.image import Image
from models.tag import Tag

class ImageTag(BaseModel):
    image_id = peewee.ForeignKeyField(Image)
    tag_id = peewee.ForeignKeyField(Tag)
