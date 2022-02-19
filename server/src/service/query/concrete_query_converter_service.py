from model.query.entity.query import Query
from model.query.data.query_data import QueryData
from service.query.query_converter_service import QueryConverterService


class ConcreteQueryConverterService(QueryConverterService):
    def convert_query(self, query: Query) -> QueryData:
        converted_query = QueryData(id=query.query_id, name=query.name, query=query.query)

        return converted_query
