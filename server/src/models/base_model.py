import peewee

import config


db = peewee.SqliteDatabase(config.DATABASE_PATH)


class BaseModel(peewee.Model):
    class Meta:
        database = db
