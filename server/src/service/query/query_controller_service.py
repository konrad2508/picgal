from model.query.data.query_data import QueryData
from model.query.request.query_request import QueryRequest
from repository.query.i_query_repository import IQueryRepository
from service.query.i_query_converter_service import IQueryConverterService
from service.query.i_query_controller_service import IQueryControllerService


class QueryControllerService(IQueryControllerService):
    def __init__(self, repository: IQueryRepository, converter: IQueryConverterService) -> None:
        self.repository = repository
        self.converter = converter

    def get_queries(self) -> list[QueryData]:
        queries = self.repository.get_queries()
        queries = [ self.converter.convert_query(query) for query in queries ]

        return queries

    def create_query(self, query: QueryRequest) -> QueryData:
        created_query = self.repository.create_query(query)
        created_query = self.converter.convert_query(created_query)

        return created_query

    def modify_query(self, id: int, modifications: QueryRequest) -> QueryData:
        updated_query = self.repository.update_query(id, modifications)
        updated_query = self.converter.convert_query(updated_query)

        return updated_query

    def delete_query(self, id: int) -> None:
        self.repository.delete_query(id)
