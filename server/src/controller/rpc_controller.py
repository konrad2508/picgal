import flask

from controller.i_controller import IController
from factory.i_controller_service_factory import IControllerServiceFactory
from model.rpc.request.config_request import ConfigRequest


class RpcController(IController):
    def __init__(self, factory: IControllerServiceFactory, route_prefix: str) -> None:
        self.factory = factory
        self.route_prefix = route_prefix

    def initialize(self) -> flask.Blueprint:
        rpc_route = f'{self.route_prefix}/rpc'

        rpc_service = self.factory.get_rpc_service()

        rpc_controller = flask.Blueprint('rpc', __name__)

        @rpc_controller.route(f'{rpc_route}/sync', methods=['POST'])
        def sync_database() -> flask.Response:
            syncing_result = rpc_service.sync_database()

            return flask.jsonify(syncing_result)

        @rpc_controller.route(f'{rpc_route}/config', methods=['GET'])
        def get_config() -> flask.Response:
            config = rpc_service.get_config()

            return flask.jsonify(config)

        @rpc_controller.route(f'{rpc_route}/config', methods=['PUT'])
        def put_config() -> flask.Response:
            modifications = ConfigRequest.from_json(flask.request.get_json(force=True))

            try:
                modified_config = rpc_service.modify_config(modifications)

                return flask.jsonify(modified_config)

            except Exception as e:
                print(e)
                flask.abort(429)

        return rpc_controller
