import flask

from controller.i_controller import IController
from model.exception.database_integrity_violated import DatabaseIntegrityViolated
from model.exception.entity_not_found import EntityNotFound
from model.image.enum.view_encrypted import ViewEncrypted
from model.image.request.download_request import DownloadRequest
from model.image.request.image_modification_request import ImageModificationRequest
from model.image.request.encrypt_request import EncryptRequest
from service.image.i_image_controller_service import IImageControllerService


class ImageController(IController):
    def __init__(self, image_service: IImageControllerService, route_prefix: str) -> None:
        self.image_service = image_service
        self.route_prefix = route_prefix

    def initialize(self) -> flask.Blueprint:
        info_route = f'{self.route_prefix}/info'
        tag_route = f'{self.route_prefix}/tag'
        image_route = f'{self.route_prefix}/image'
        preview_route = f'{self.route_prefix}/preview'
        sample_route = f'{self.route_prefix}/sample'

        image_controller = flask.Blueprint('image', __name__)

        @image_controller.route(f'{info_route}', methods=['GET'])
        def get_infos() -> flask.Response:
            tags = flask.request.args.get('tags')
            page = flask.request.args.get('page', type=int, default=1)
            view_encrypted = flask.request.args.get('viewEncrypted', type=ViewEncrypted, default=ViewEncrypted.NO)

            info = self.image_service.get_infos(
                image_url=image_route,
                preview_url=preview_route,
                sample_url=sample_route,
                tags=tags,
                page=page,
                view_encrypted=view_encrypted
            )

            return flask.jsonify(info)

        @image_controller.route(f'{info_route}', methods=['PUT'])
        def put_info_batch() -> flask.Response:
            batch_modifications = ImageModificationRequest.from_json(flask.request.get_json(force=True))

            try:
                modified_images = self.image_service.modify_info_batch(image_route, preview_route, sample_route, batch_modifications)

                return flask.jsonify(modified_images)

            except EntityNotFound:
                flask.abort(404)

            except DatabaseIntegrityViolated:
                flask.abort(409)

        @image_controller.route(f'{info_route}/<id>', methods=['PUT'])
        def put_info(id: int) -> flask.Response:
            modifications = ImageModificationRequest.from_json(flask.request.get_json(force=True))

            try:
                modified_image = self.image_service.modify_info(image_route, preview_route, sample_route, id, modifications)

                return flask.jsonify(modified_image)
            
            except EntityNotFound:
                flask.abort(404)

            except DatabaseIntegrityViolated:
                flask.abort(409)

        @image_controller.route(f'{info_route}/count', methods=['GET'])
        def get_infos_count() -> flask.Response:
            tags = flask.request.args.get('tags')
            view_encrypted = flask.request.args.get('viewEncrypted', type=ViewEncrypted, default=ViewEncrypted.NO)

            count = self.image_service.get_infos_count(tags, view_encrypted)

            return flask.jsonify(count)

        @image_controller.route(f'{tag_route}', methods=['GET'])
        def get_tags() -> flask.Response:
            view_encrypted = flask.request.args.get('viewEncrypted', type=ViewEncrypted, default=ViewEncrypted.NO)
            
            tags = self.image_service.get_tags(view_encrypted)

            return flask.jsonify(tags)

        @image_controller.route(f'{image_route}/<id>', methods=['GET'])
        def get_image(id: int) -> flask.Response:
            try:
                image = self.image_service.get_image_content(id)

                response = flask.make_response(flask.send_file(image, mimetype='image/*'))
                response.headers['Cache-Control'] = 'no-store'

                return response
            
            except (EntityNotFound,  FileNotFoundError):
                flask.abort(404)

        @image_controller.route(f'{image_route}/<id>/save', methods=['POST'])
        def download_image(id: int) -> flask.Response:
            requested_filename = DownloadRequest.from_json(flask.request.get_json(force=True))

            try:
                download_result = self.image_service.download_image(id, requested_filename)

                return flask.jsonify(download_result)
        
            except Exception as e:
                print(e)
                flask.abort(403)

        @image_controller.route(f'{image_route}/toggle-encrypt', methods=['POST'])
        def toggle_encrypt_image() -> flask.Response:
            images_to_encode = EncryptRequest.from_json(flask.request.get_json(force=True))

            try:
                encoding_result = self.image_service.toggle_encrypt_files(images_to_encode)

                return flask.jsonify(encoding_result)
            
            except Exception as e:
                print(e)
                flask.abort(429)

        @image_controller.route(f'{preview_route}/<id>', methods=['GET'])
        def get_preview(id: int) -> flask.Response:
            try:
                preview = self.image_service.get_preview_content(id)

                response = flask.make_response(flask.send_file(preview, mimetype='image/*'))
                response.headers['Cache-Control'] = 'no-store'

                return response
            
            except (EntityNotFound, FileNotFoundError):
                flask.abort(404)

        @image_controller.route(f'{sample_route}/<id>', methods=['GET'])
        def get_sample(id: int) -> flask.Response:
            try:
                sample = self.image_service.get_sample_content(id)

                response = flask.make_response(flask.send_file(sample, mimetype='image/*'))
                response.headers['Cache-Control'] = 'no-store'

                return response
            
            except (EntityNotFound, FileNotFoundError):
                flask.abort(404)

        return image_controller
