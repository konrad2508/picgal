import peewee

from models.base_model import BaseModel


class Tag(BaseModel):
    tag_id = peewee.PrimaryKeyField()
    name = peewee.CharField(unique=True)
    type = peewee.IntegerField()
