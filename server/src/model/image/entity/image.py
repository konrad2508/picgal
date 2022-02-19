import peewee

from model.base_model import BaseModel


class Image(BaseModel):
    image_id = peewee.PrimaryKeyField()
    file = peewee.CharField(unique=True)
    preview = peewee.CharField(unique=True)
    sample = peewee.CharField(unique=True)
    width = peewee.IntegerField()
    height = peewee.IntegerField()
    favourite = peewee.BooleanField()
    created_time = peewee.DateTimeField()
