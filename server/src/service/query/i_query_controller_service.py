from abc import ABC, abstractmethod

from model.query.data.query_data import QueryData
from model.query.request.query_request import QueryRequest


class IQueryControllerService(ABC):
    @abstractmethod
    def get_queries(self) -> list[QueryData]: ...

    @abstractmethod
    def create_query(self, query: QueryRequest) -> QueryData: ...

    @abstractmethod
    def modify_query(self, id: int, modifications: QueryRequest) -> QueryData: ...

    @abstractmethod
    def delete_query(self, id: int) -> None: ...
