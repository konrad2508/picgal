import peewee

from config import conf


db = peewee.SqliteDatabase(conf.DATABASE_PATH)


class BaseModel(peewee.Model):
    class Meta:
        database = db
