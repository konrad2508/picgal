import flask
from peewee import IntegrityError

from factory.controller_service_factory import ControllerServiceFactory
from model.image.request.image_modification_request import ImageModificationRequest


def construct_blueprint(factory: ControllerServiceFactory, route_prefix: str) -> flask.Blueprint:
    info_route = f'{route_prefix}/info'
    tag_route = f'{route_prefix}/tag'
    image_route = f'{route_prefix}/image'
    preview_route = f'{route_prefix}/preview'
    sample_route = f'{route_prefix}/sample'

    image_service = factory.get_image_service()

    image_controller = flask.Blueprint('image', __name__)

    @image_controller.route(f'{info_route}', methods=['GET'])
    def get_infos() -> flask.Response:
        tags = flask.request.args.get('tags')
        page = flask.request.args.get('page', type=int, default=1)

        info = image_service.get_infos(image_url=image_route, preview_url=preview_route, sample_url=sample_route, tags=tags, page=page)

        return flask.jsonify(info)

    @image_controller.route(f'{info_route}/<id>', methods=['PUT'])
    def put_info(id: int) -> flask.Response:
        modifications = ImageModificationRequest.from_json(flask.request.get_json(force=True))

        try:
            modified_image = image_service.modify_info(image_route, preview_route, sample_route, id, modifications)

            return flask.jsonify(modified_image)
        
        except IntegrityError:
            flask.abort(409)

    @image_controller.route(f'{info_route}/count', methods=['GET'])
    def get_infos_count() -> flask.Response:
        tags = flask.request.args.get('tags')

        count = image_service.get_infos_count(tags)

        return flask.jsonify(count)

    @image_controller.route(f'{tag_route}', methods=['GET'])
    def get_tags() -> flask.Response:
        tags = image_service.get_tags()

        return flask.jsonify(tags)

    @image_controller.route(f'{image_route}/<id>', methods=['GET'])
    def get_image(id: int) -> flask.Response:
        try:
            image_path = image_service.get_image_path(id)

            return flask.send_file(image_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    @image_controller.route(f'{preview_route}/<id>', methods=['GET'])
    def get_preview(id: int) -> flask.Response:
        try:
            preview_path = image_service.get_preview_path(id)

            return flask.send_file(preview_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    @image_controller.route(f'{sample_route}/<id>', methods=['GET'])
    def get_sample(id: int) -> flask.Response:
        try:
            sample_path = image_service.get_sample_path(id)

            return flask.send_file(sample_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    return image_controller
