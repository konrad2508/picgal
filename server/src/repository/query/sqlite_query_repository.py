from peewee import DoesNotExist, ModelSelect

from model.base_model import db
from model.query.entity.query import Query
from model.query.request.query_request import QueryRequest
from repository.query.query_repository import QueryRepository


class SqliteQueryRepository(QueryRepository):
    def __init__(self) -> None:
        self.db = db

    def get_queries(self) -> ModelSelect:
        with self.db.atomic():
            queries = Query.select()

        return queries

    def create_query(self, query: QueryRequest) -> Query:
        with self.db.atomic():
            created = Query.create(name=query.name, query=query.query)

        return created

    def update_query(self, id: int, modifications: QueryRequest) -> Query:
        with self.db.atomic():
            if not Query.select().where(Query.query_id == id).exists():
                raise DoesNotExist

            Query.update(name=modifications.name, query=modifications.query).where(Query.query_id == id).execute()
            updated = Query.get_by_id(id)

        return updated

    def delete_query(self, id: int) -> None:
        with self.db.atomic():
            if not Query.select().where(Query.query_id == id).exists():
                raise DoesNotExist

            Query.delete().where(Query.query_id == id).execute()
