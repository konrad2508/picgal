from abc import ABC, abstractmethod

from model.query.entity.query import Query
from model.query.data.query_data import QueryData


class IQueryConverterService(ABC):
    @abstractmethod
    def convert_query(self, query: Query) -> QueryData: ...
