import flask

from controller.i_controller import IController
from model.exception.database_integrity_violated import DatabaseIntegrityViolated
from model.exception.entity_not_found import EntityNotFound
from model.query.request.query_request import QueryRequest
from service.query.i_query_controller_service import IQueryControllerService


class QueryController(IController):
    def __init__(self, query_service: IQueryControllerService, route_prefix: str) -> None:
        self.query_service = query_service
        self.route_prefix = route_prefix

    def initialize(self) -> flask.Blueprint:
        query_route = f'{self.route_prefix}/query'

        query_controller = flask.Blueprint('query', __name__)

        @query_controller.route(f'{query_route}', methods=['GET'])
        def get_queries() -> flask.Response:
            queries = self.query_service.get_queries()

            return flask.jsonify(queries)

        @query_controller.route(f'{query_route}', methods=['POST'])
        def post_query() -> flask.Response:
            query = QueryRequest.from_json(flask.request.get_json(force=True))

            try:
                created_query = self.query_service.create_query(query)

                return flask.jsonify(created_query)

            except DatabaseIntegrityViolated:
                flask.abort(409)

        @query_controller.route(f'{query_route}/<id>', methods=['PUT'])
        def put_query(id: int) -> flask.Response:
            modifications = QueryRequest.from_json(flask.request.get_json(force=True))

            try:
                modified_query = self.query_service.modify_query(id, modifications)

                return flask.jsonify(modified_query)

            except EntityNotFound:
                flask.abort(404)

            except DatabaseIntegrityViolated:
                flask.abort(409)

        @query_controller.route(f'{query_route}/<id>', methods=['DELETE'])
        def delete_query(id: int) -> flask.Response:
            try:
                self.query_service.delete_query(id)

                return flask.Response(status=204)

            except EntityNotFound:
                flask.abort(404)

        return query_controller
