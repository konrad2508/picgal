import io
import subprocess
from config import Config
from model.image.data.image_data import ImageData
from model.image.data.count_data import CountData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.data.encrypt_result import EncryptResult
from model.image.enum.view_encrypted import ViewEncrypted
from model.image.request.encrypt_request import EncryptRequest
from model.image.request.image_modification_request import ImageModificationRequest
from repository.image.i_image_repository import IImageRepository
from service.image.i_image_request_converter_service import IImageRequestConverterService
from service.image.i_image_controller_service import IImageControllerService
from service.i_path_resolver_service import IPathResolverService


class ImageControllerService(IImageControllerService):
    def __init__(
            self,
            repository: IImageRepository,
            converter: IImageRequestConverterService,
            path_resolver: IPathResolverService,
            cfg: Config) -> None:
        self.repository = repository
        self.image_request_converter = converter
        self.path_resolver = path_resolver
        self.cfg = cfg

    def get_infos(self, image_url: str, preview_url: str, sample_url: str, tags: str | None, page: int, view_encrypted: ViewEncrypted) -> list[ImageData]:
        normal_tag_array, virtual_tag_array = self.image_request_converter.convert_tagstring(self.repository.get_conditions, tagstring=tags)

        images = self.repository.get_images(
            page,
            view_encrypted,
            normal_tag_array,
            virtual_tag_array,
            image_url,
            preview_url,
            sample_url
        )

        return images

    def modify_info_batch(self, image_url: str, preview_url: str, sample_url: str, batch_modifications: ImageModificationRequest) -> list[ImageData]:
        images = self.repository.modify_image_batch(
            batch_modifications,
            image_url,
            preview_url,
            sample_url
        )

        return images

    def modify_info(self, image_url: str, preview_url: str, sample_url: str, id: int, modifications: ImageModificationRequest) -> ImageData:
        image = self.repository.modify_image(
            id,
            modifications,
            image_url,
            preview_url,
            sample_url
        )

        return image

    def get_infos_count(self, tags: str | None, view_encrypted: ViewEncrypted) -> CountData:
        normal_tag_array, virtual_tag_array = self.image_request_converter.convert_tagstring(self.repository.get_conditions, tags)

        count = self.repository.get_images_count(view_encrypted, normal_tag_array, virtual_tag_array)

        return count

    def get_tags(self, view_encrypted: ViewEncrypted) -> list[TagData | VirtualTagData]:
        normal_tags = self.repository.get_tags(view_encrypted)
        virtual_tags = self.repository.get_virtual_tags()

        tags = normal_tags + virtual_tags

        return tags

    def toggle_encrypt_files(self, images_to_encrypt: EncryptRequest) -> EncryptResult:
        result = EncryptResult([])

        for id in images_to_encrypt.ids:
            file_location, preview_location, sample_location, is_encrypted = self.repository.get_image_file_location(id)

            f = [ self._decrypt_image, self._encrypt_image ] if is_encrypted else [ self._encrypt_image, self._decrypt_image ]

            try:
                f[0](file_location, preview_location, sample_location)

            except:
                continue

            try:
                img = self.repository.toggle_encrypt_image(id)
                result.images.append(img)

            except:
                f[1](file_location, preview_location, sample_location)

        return result

    def get_image_content(self, id: int) -> str:
        file_location, is_encrypted = self.repository.get_image_original_file_location(id)
        path = self.path_resolver.resolve_path(file_location)

        if is_encrypted:
            img = io.BytesIO(self._decrypt_file(path))

        else:
            with open(path, 'rb') as f:
                img = io.BytesIO(f.read())

        return img

    def get_preview_content(self, id: int) -> str:
        preview_location, is_encrypted = self.repository.get_image_preview_file_location(id)
        path = self.path_resolver.resolve_path(preview_location)

        if is_encrypted:
            prev = io.BytesIO(self._decrypt_file(path))

        else:
            with open(path, 'rb') as f:
                prev = io.BytesIO(f.read())

        return prev

    def get_sample_content(self, id: int) -> str:
        sample_location, is_encrypted = self.repository.get_image_sample_file_location(id)
        path = self.path_resolver.resolve_path(sample_location)

        if is_encrypted:
            sam = io.BytesIO(self._decrypt_file(path))

        else:
            with open(path, 'rb') as f:
                sam = io.BytesIO(f.read())

        return sam

    def _encrypt_file(self, path: str) -> bytes:
        file = subprocess.check_output([self.cfg.GPG_BIN, '-o', '-', '-er', self.cfg.RECIPIENT, path])

        return file
    
    def _decrypt_file(self, path: str) -> bytes:
        file = subprocess.check_output([self.cfg.GPG_BIN, '-qd', path])

        return file

    def _encrypt_image(self, file_location: str, preview_location: str, sample_location: str) -> None:
        enc_file = self._encrypt_file(file_location)
        enc_preview = self._encrypt_file(preview_location)
        enc_sample = self._encrypt_file(sample_location)

        with open(file_location, 'wb') as f1, open(preview_location, 'wb') as f2, open(sample_location, 'wb') as f3:
            f1.write(enc_file)
            f2.write(enc_preview)
            f3.write(enc_sample)

    def _decrypt_image(self, file_location: str, preview_location: str, sample_location: str) -> None:
        dec_file = self._decrypt_file(file_location)
        dec_preview = self._decrypt_file(preview_location)
        dec_sample = self._decrypt_file(sample_location)
        
        with open(file_location, 'wb') as f1, open(preview_location, 'wb') as f2, open(sample_location, 'wb') as f3:
            f1.write(dec_file)
            f2.write(dec_preview)
            f3.write(dec_sample)
