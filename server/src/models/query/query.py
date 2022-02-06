import peewee
from models.base_model import BaseModel

class Query(BaseModel):
    query_id = peewee.PrimaryKeyField()
    name = peewee.CharField(unique=True)
    query = peewee.CharField()
