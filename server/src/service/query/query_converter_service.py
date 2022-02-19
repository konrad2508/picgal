from model.query.entity.query import Query
from model.query.data.query_data import QueryData


class QueryConverterService:
    def convert_query(self, query: Query) -> QueryData:
        converted_query = QueryData(id=query.query_id, name=query.name, query=query.query)

        return converted_query
