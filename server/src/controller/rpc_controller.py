import flask

from controller.i_controller import IController
from factory.i_controller_service_factory import IControllerServiceFactory


class RpcController(IController):
    def __init__(self, factory: IControllerServiceFactory, route_prefix: str) -> None:
        self.factory = factory
        self.route_prefix = route_prefix
    
    def initialize(self) -> flask.Blueprint:
        rpc_route = f'{self.route_prefix}/rpc'

        rpc_service = self.factory.get_rpc_service()

        rpc_controller = flask.Blueprint('rpc', __name__)

        @rpc_controller.route(f'{rpc_route}/syncdatabase', methods=['POST'])
        def sync_database() -> flask.Response:
            syncing_result = rpc_service.sync_database()

            return flask.jsonify(syncing_result)

        return rpc_controller
