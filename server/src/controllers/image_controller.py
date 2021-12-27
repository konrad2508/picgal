import flask
from repositories.image_repository import ImageRepository
from services.model_converter_service import ModelConverterService
from services.image_controller_service import ImageControllerService

def construct_blueprint(route_prefix):
    info_route = f'{route_prefix}/original/info'
    image_route = f'{route_prefix}/original/image'
    tag_route = f'{route_prefix}/original/tag'
    preview_route = f'{route_prefix}/preview/image'

    original_repository = ImageRepository()
    model_converter = ModelConverterService()
    original_service = ImageControllerService(original_repository, model_converter)

    original = flask.Blueprint('image', __name__)

    @original.route(info_route, methods=['GET'])
    def get_infos():
        tags = flask.request.args.get('tags')
        page = flask.request.args.get('page', type=int, default=1)

        if not tags:
            info = original_service.get_all_infos(image_url=image_route, preview_url=preview_route, page=page)

        else:
            info = original_service.get_tagged_infos(image_url=image_route, preview_url=preview_route, tags=tags, page=page)

        return flask.jsonify(info)

    @original.route(f'{info_route}/<id>', methods=['PUT'])
    def put_info(id):
        modifications = flask.request.get_json(force=True)

        modified_image = original_service.modify_info(image_route, preview_route, id, modifications)

        return flask.jsonify(modified_image)

    @original.route(f'{info_route}/count', methods=['GET'])
    def get_infos_count():
        tags = flask.request.args.get('tags')

        if not tags:
            count = original_service.get_all_infos_count()

        else:
            count = original_service.get_tagged_infos_count(tags)

        return flask.jsonify(count)

    @original.route(f'{info_route}/favourites', methods=['GET'])
    def get_favourite_infos():
        page = flask.request.args.get('page', type=int, default=1)

        info = original_service.get_favourite_infos(image_url=image_route, preview_url=preview_route, page=page)

        return flask.jsonify(info)

    @original.route(f'{info_route}/favourites/count', methods=['GET'])
    def get_favourite_infos_count():
        count = original_service.get_favourite_infos_count()

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

    return original
