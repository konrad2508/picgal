import flask
from peewee import IntegrityError, DoesNotExist
from repositories.query_repository import QueryRepository
from services.query.query_converter_service import QueryConverterService
from services.query.query_controller_service import QueryService

def construct_blueprint(route_prefix):
    query_route = f'{route_prefix}/query'

    query_repository = QueryRepository()
    query_converter = QueryConverterService()
    query_service = QueryService(query_repository, query_converter)

    query_controller = flask.Blueprint('query', __name__)

    @query_controller.route(f'{query_route}', methods=['GET'])
    def get_queries():
        queries = query_service.get_queries()

        return flask.jsonify(queries)
    
    @query_controller.route(f'{query_route}', methods=['POST'])
    def post_query():
        query = flask.request.get_json(force=True)

        try:
            created_query = query_service.create_query(query)

            return flask.jsonify(created_query)

        except IntegrityError:
            flask.abort(409)

    @query_controller.route(f'{query_route}/<id>', methods=['PUT'])
    def put_query(id):
        modifications = flask.request.get_json(force=True)

        try:
            modified_query = query_service.modify_query(id, modifications)

            return flask.jsonify(modified_query)
        
        except DoesNotExist:
            flask.abort(404)

    @query_controller.route(f'{query_route}/<id>', methods=['DELETE'])
    def delete_query(id):
        try:
            query_service.delete_query(id)

            return flask.Response(status=204)

        except DoesNotExist:
            flask.abort(404)

    return query_controller
