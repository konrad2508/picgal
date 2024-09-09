import flask

from controller.i_controller import IController
from model.image.enum.view_encrypted import ViewEncrypted
from model.rpc.request.config_request import ConfigRequest
from model.rpc.request.scan_request import ScanRequest
from service.rpc.i_rpc_controller_service import IRPCControllerService


class RpcController(IController):
    def __init__(self, rpc_service: IRPCControllerService, route_prefix: str) -> None:
        self.rpc_service = rpc_service
        self.route_prefix = route_prefix

    def initialize(self) -> flask.Blueprint:
        rpc_route = f'{self.route_prefix}/rpc'

        rpc_controller = flask.Blueprint('rpc', __name__)

        @rpc_controller.route(f'{rpc_route}/sync', methods=['POST'])
        def sync_database() -> flask.Response:
            syncing_result = self.rpc_service.sync_database()

            return flask.jsonify(syncing_result)

        @rpc_controller.route(f'{rpc_route}/config', methods=['GET'])
        def get_config() -> flask.Response:
            config = self.rpc_service.get_config()

            return flask.jsonify(config)

        @rpc_controller.route(f'{rpc_route}/config', methods=['PUT'])
        def put_config() -> flask.Response:
            modifications = ConfigRequest.from_json(flask.request.get_json(force=True))

            try:
                modified_config = self.rpc_service.modify_config(modifications)

                return flask.jsonify(modified_config)

            except Exception as e:
                print(e)
                flask.abort(429)
        
        @rpc_controller.route(f'{rpc_route}/scanner', methods=['POST'])
        def scan_directory() -> flask.Response:
            scan_request = ScanRequest.from_json(flask.request.get_json(force=True))
            view_encrypted = flask.request.args.get('viewEncrypted', type=ViewEncrypted, default=ViewEncrypted.NO)

            syncing_result = self.rpc_service.scan_directory_for_duplicates(scan_request, view_encrypted)

            return flask.jsonify(syncing_result)
        
        @rpc_controller.route(f'{rpc_route}/auth', methods=['POST'])
        def authenticate() -> flask.Response:
            auth_result = self.rpc_service.authenticate()

            return flask.jsonify(auth_result)

        return rpc_controller
