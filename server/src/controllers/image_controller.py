import flask
from peewee import IntegrityError
from repositories.image_repository import ImageRepository
from repositories.virtual_tag_repository import VirtualTagRepository
from services.path_resolver_service import PathResolverService
from services.converter_service import ConverterService
from services.image_controller_service import ImageControllerService

def construct_blueprint(route_prefix):
    info_route = f'{route_prefix}/info'
    favourite_route = f'{route_prefix}/info/favourite'
    tag_route = f'{route_prefix}/tag'
    image_route = f'{route_prefix}/image'
    preview_route = f'{route_prefix}/preview'
    sample_route = f'{route_prefix}/sample'

    original_repository = ImageRepository()
    virtual_tag_repository = VirtualTagRepository()
    converter = ConverterService(virtual_tag_repository)
    path_resolver = PathResolverService()
    original_service = ImageControllerService(original_repository, virtual_tag_repository, converter, path_resolver)

    original = flask.Blueprint('image', __name__)

    @original.route(f'{info_route}', methods=['GET'])
    def get_infos():
        tags = flask.request.args.get('tags')
        page = flask.request.args.get('page', type=int, default=1)

        info = original_service.get_infos(image_url=image_route, preview_url=preview_route, sample_url=sample_route, tags=tags, page=page)

        return flask.jsonify(info)

    @original.route(f'{info_route}/<id>', methods=['PUT'])
    def put_info(id):
        modifications = flask.request.get_json(force=True)

        try:
            modified_image = original_service.modify_info(image_route, preview_route, sample_route, id, modifications)

            return flask.jsonify(modified_image)
        
        except IntegrityError:
            flask.abort(409)

    @original.route(f'{info_route}/count', methods=['GET'])
    def get_infos_count():
        tags = flask.request.args.get('tags')

        count = original_service.get_infos_count(tags)

        return flask.jsonify(count)

    @original.route(f'{tag_route}', methods=['GET'])
    def get_tags():
        tags = original_service.get_tags()

        return flask.jsonify(tags)

    @original.route(f'{image_route}/<id>', methods=['GET'])
    def get_image(id):
        try:
            image_path = original_service.get_image_path(id)

            return flask.send_file(image_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    @original.route(f'{preview_route}/<id>', methods=['GET'])
    def get_preview(id):
        try:
            preview_path = original_service.get_preview_path(id)

            return flask.send_file(preview_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    @original.route(f'{sample_route}/<id>', methods=['GET'])
    def get_sample(id):
        try:
            sample_path = original_service.get_sample_path(id)

            return flask.send_file(sample_path, mimetype='image/jpeg')
        
        except FileNotFoundError:
            flask.abort(404)

    return original
