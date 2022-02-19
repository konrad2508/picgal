from model.image.data.image_data import ImageData
from model.image.data.count_data import CountData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.request.image_modification_request import ImageModificationRequest
from repository.image.image_repository import ImageRepository
from repository.image.virtual_tag_repository import VirtualTagRepository
from service.image.image_converter_service import ImageConverterService
from service.path_resolver_service import PathResolverService


class ImageControllerService:
    def __init__(
            self,
            repository: ImageRepository,
            virtual_tag_repository: VirtualTagRepository,
            converter: ImageConverterService,
            path_resolver: PathResolverService) -> None:
        self.repository = repository
        self.virtual_tag_repository = virtual_tag_repository
        self.converter = converter
        self.path_resolver = path_resolver

    def get_infos(self, image_url: str, preview_url: str, sample_url: str, tags: str, page: int) -> list[ImageData]:
        normal_tag_array, virtual_tag_array = self.converter.convert_tagstring(tagstring=tags)

        images = self.repository.get_images(page, normal_tags=normal_tag_array, virtual_tags=virtual_tag_array)
        images = [ self.converter.convert_image(img, loc_original=image_url, loc_preview=preview_url, loc_sample=sample_url) for img in images ]

        return images

    def modify_info(self, image_url: str, preview_url: str, sample_url: str, id: int, modifications: ImageModificationRequest) -> ImageData:
        image = self.repository.modify_image(id, modifications)
        image = self.converter.convert_image(image, loc_original=image_url, loc_preview=preview_url, loc_sample=sample_url)

        return image

    def get_infos_count(self, tags: str) -> CountData:
        normal_tag_array, virtual_tag_array = self.converter.convert_tagstring(tagstring=tags)

        count = self.repository.get_images_count(normal_tags=normal_tag_array, virtual_tags=virtual_tag_array)
        count = self.converter.convert_count(count)

        return count

    def get_tags(self) -> list[TagData | VirtualTagData]:
        normal_tags = self.repository.get_tags()
        normal_tags = [ self.converter.convert_tags(normal_tag) for normal_tag in normal_tags ]

        virtual_tags = self.virtual_tag_repository.get_virtual_tags()
        virtual_tags = [ self.converter.convert_virtual_tag(virtual_tag) for virtual_tag in virtual_tags ]

        tags = normal_tags + virtual_tags

        return tags

    def get_image_path(self, id: int) -> str:
        image = self.repository.get_image(id)

        try:
            return self.path_resolver.resolve_path(image.file)

        except AttributeError:
            raise FileNotFoundError()

    def get_preview_path(self, id: int) -> str:
        image = self.repository.get_image(id)

        try:
            return self.path_resolver.resolve_path(image.preview)

        except AttributeError:
            raise FileNotFoundError()

    def get_sample_path(self, id: int) -> str:
        image = self.repository.get_image(id)

        try:
            return self.path_resolver.resolve_path(image.sample)

        except AttributeError:
            raise FileNotFoundError()
