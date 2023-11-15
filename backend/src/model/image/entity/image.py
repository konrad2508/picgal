import datetime
import peewee

from model.base_model import BaseModel


class Image(BaseModel):
    image_id = peewee.PrimaryKeyField()
    file = peewee.CharField(unique=True)
    preview = peewee.CharField(unique=True)
    sample = peewee.CharField(unique=True)
    width = peewee.IntegerField(default=0)
    height = peewee.IntegerField(default=0)
    favourite = peewee.BooleanField(default=False)
    encrypted = peewee.BooleanField(default=False)
    created_time = peewee.DateTimeField(default=datetime.datetime.min)
