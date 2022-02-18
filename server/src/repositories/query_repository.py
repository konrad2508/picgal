from abc import ABC, abstractmethod

from peewee import ModelSelect

from models.query.query import Query
from models.query.request.query_request import QueryRequest


class QueryRepository(ABC):
    @abstractmethod
    def get_queries(self) -> ModelSelect: ...

    @abstractmethod
    def create_query(self, query: QueryRequest) -> Query: ...

    @abstractmethod
    def update_query(self, id: int, modifications: QueryRequest) -> Query: ...

    @abstractmethod
    def delete_query(self, id: int) -> None: ...
