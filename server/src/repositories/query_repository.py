from peewee import DoesNotExist
from models.base_model import db
from models.query.query import Query

class QueryRepository(object):
    def __init__(self):
        self.db = db

    def get_queries(self):
        with self.db.atomic():
            queries = Query.select()

        return queries

    def create_query(self, query):
        with self.db.atomic():
            created = Query.create(**query)

        return created

    def update_query(self, id, modifications):
        with self.db.atomic():
            if not Query.select().where(Query.query_id == id).exists():
                raise DoesNotExist

            Query.update(**modifications).where(Query.query_id == id).execute()
            updated = Query.get_by_id(id)

        return updated

    def delete_query(self, id):
        with self.db.atomic():
            if not Query.select().where(Query.query_id == id).exists():
                raise DoesNotExist

            Query.delete().where(Query.query_id == id).execute()
