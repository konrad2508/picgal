from peewee import SqliteDatabase, IntegrityError

from model.exception.database_integrity_violated import DatabaseIntegrityViolated
from model.exception.entity_not_found import EntityNotFound
from model.query.entity.query import Query
from model.query.request.query_request import QueryRequest
from repository.query.i_query_repository import IQueryRepository


class SqliteQueryRepository(IQueryRepository):
    def __init__(self, db: SqliteDatabase) -> None:
        self.db = db

    def get_queries(self) -> list[Query]:
        with self.db.atomic():
            queries = Query.select()

        return queries

    def create_query(self, query: QueryRequest) -> Query:
        try:
            with self.db.atomic():
                created = Query.create(name=query.name, query=query.query)

            return created
        
        except IntegrityError:
            raise DatabaseIntegrityViolated

    def update_query(self, id: int, modifications: QueryRequest) -> Query:
        try:
            with self.db.atomic():
                if not Query.select().where(Query.query_id == id).exists():
                    raise EntityNotFound

                Query.update(name=modifications.name, query=modifications.query).where(Query.query_id == id).execute()
                updated = Query.get_by_id(id)

            return updated
        
        except IntegrityError:
            raise DatabaseIntegrityViolated

    def delete_query(self, id: int) -> None:
        with self.db.atomic():
            if not Query.select().where(Query.query_id == id).exists():
                raise EntityNotFound

            Query.delete().where(Query.query_id == id).execute()
