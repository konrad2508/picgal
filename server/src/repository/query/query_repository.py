from abc import ABC, abstractmethod

from model.query.entity.query import Query
from model.query.request.query_request import QueryRequest


class QueryRepository(ABC):
    @abstractmethod
    def get_queries(self) -> list[Query]: ...

    @abstractmethod
    def create_query(self, query: QueryRequest) -> Query: ...

    @abstractmethod
    def update_query(self, id: int, modifications: QueryRequest) -> Query: ...

    @abstractmethod
    def delete_query(self, id: int) -> None: ...
