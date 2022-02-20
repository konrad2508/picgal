from abc import ABC, abstractmethod
from typing import Callable

from peewee import Expression

from model.image.data.count_data import CountData
from model.image.data.image_data import ImageData
from model.image.data.tag_data import TagData
from model.image.request.image_modification_request import ImageModificationRequest


class ImageDatabaseRepository(ABC):
    @abstractmethod
    def get_image(
            self,
            id: int,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> ImageData:
        ...

    @abstractmethod
    def modify_image(
            self,
            id: int,
            modifications: ImageModificationRequest,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> ImageData:
        ...

    @abstractmethod
    def get_images(
            self,
            page: int,
            normal_tags: list[str],
            virtual_tags: list[Callable[[], Expression]],
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> list[ImageData]:
        ...

    @abstractmethod
    def get_images_count(self, normal_tags: list[str], virtual_tags: list[Callable[[], Expression]]) -> CountData: ...

    @abstractmethod
    def get_tags(self) -> list[TagData]: ...

    @abstractmethod
    def get_image_original_file_location(self, id: int) -> str: ...

    @abstractmethod
    def get_image_preview_file_location(self, id: int) -> str: ...

    @abstractmethod
    def get_image_sample_file_location(self, id: int) -> str: ...
