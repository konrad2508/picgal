from model.image.data.image_data import ImageData
from model.image.data.count_data import CountData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData
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
            path_resolver: IPathResolverService) -> None:
        self.repository = repository
        self.image_request_converter = converter
        self.path_resolver = path_resolver

    def get_infos(self, image_url: str, preview_url: str, sample_url: str, tags: str | None, page: int) -> list[ImageData]:
        normal_tag_array, virtual_tag_array = self.image_request_converter.convert_tagstring(self.repository.get_conditions, tagstring=tags)

        images = self.repository.get_images(
            page,
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

    def get_infos_count(self, tags: str | None) -> CountData:
        normal_tag_array, virtual_tag_array = self.image_request_converter.convert_tagstring(self.repository.get_conditions, tags)

        count = self.repository.get_images_count(normal_tag_array, virtual_tag_array)

        return count

    def get_tags(self) -> list[TagData | VirtualTagData]:
        normal_tags = self.repository.get_tags()
        virtual_tags = self.repository.get_virtual_tags()

        tags = normal_tags + virtual_tags

        return tags

    def get_image_path(self, id: int) -> str:
        file_location = self.repository.get_image_original_file_location(id)

        return self.path_resolver.resolve_path(file_location)

    def get_preview_path(self, id: int) -> str:
        preview_location = self.repository.get_image_preview_file_location(id)

        return self.path_resolver.resolve_path(preview_location)

    def get_sample_path(self, id: int) -> str:
        sample_location = self.repository.get_image_sample_file_location(id)

        return self.path_resolver.resolve_path(sample_location)
