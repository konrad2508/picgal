import flask
from peewee import IntegrityError
from repositories.image_repository import ImageRepository
from repositories.virtual_tag_repository import VirtualTagRepository
from services.path_resolver_service import PathResolverService
from services.image.image_converter_service import ImageConverterService
from services.image.image_controller_service import ImageControllerService

def construct_blueprint(route_prefix):
    info_route = f'{route_prefix}/info'
    tag_route = f'{route_prefix}/tag'
    image_route = f'{route_prefix}/image'
    preview_route = f'{route_prefix}/preview'
    sample_route = f'{route_prefix}/sample'

    image_repository = ImageRepository()
    virtual_tag_repository = VirtualTagRepository()
    image_converter = ImageConverterService(virtual_tag_repository)
    path_resolver = PathResolverService()
    image_service = ImageControllerService(image_repository, virtual_tag_repository, image_converter, path_resolver)

    image_controller = flask.Blueprint('image', __name__)

    @image_controller.route(f'{info_route}', methods=['GET'])
    def get_infos():
        tags = flask.request.args.get('tags')
        page = flask.request.args.get('page', type=int, default=1)

        info = image_service.get_infos(image_url=image_route, preview_url=preview_route, sample_url=sample_route, tags=tags, page=page)

        return flask.jsonify(info)

    @image_controller.route(f'{info_route}/<id>', methods=['PUT'])
    def put_info(id):
        modifications = flask.request.get_json(force=True)

        try:
            modified_image = image_service.modify_info(image_route, preview_route, sample_route, id, modifications)

            return flask.jsonify(modified_image)
        
        except IntegrityError:
            flask.abort(409)

    @image_controller.route(f'{info_route}/count', methods=['GET'])
    def get_infos_count():
        tags = flask.request.args.get('tags')

        count = image_service.get_infos_count(tags)

        return flask.jsonify(count)

    @image_controller.route(f'{tag_route}', methods=['GET'])
    def get_tags():
        tags = image_service.get_tags()

        return flask.jsonify(tags)

    @image_controller.route(f'{image_route}/<id>', methods=['GET'])
    def get_image(id):
        try:
            image_path = image_service.get_image_path(id)

            return flask.send_file(image_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    @image_controller.route(f'{preview_route}/<id>', methods=['GET'])
    def get_preview(id):
        try:
            preview_path = image_service.get_preview_path(id)

            return flask.send_file(preview_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    @image_controller.route(f'{sample_route}/<id>', methods=['GET'])
    def get_sample(id):
        try:
            sample_path = image_service.get_sample_path(id)

            return flask.send_file(sample_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    return image_controller
