import peewee

from model.base_model import BaseModel


class VirtualTag(BaseModel):
    virtual_tag_id = peewee.PrimaryKeyField()
    name = peewee.CharField(unique=True)
