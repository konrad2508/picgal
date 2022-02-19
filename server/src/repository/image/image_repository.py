from abc import ABC, abstractmethod
from typing import Callable

from peewee import Expression

from model.image.entity.image import Image
from model.image.request.image_modification_request import ImageModificationRequest
from model.image.object.tag_with_count import TagWithCount


class ImageRepository(ABC):
    @abstractmethod
    def get_image(self, id: int) -> Image: ...

    @abstractmethod
    def modify_image(self, id: int, modifications: ImageModificationRequest) -> Image: ...

    @abstractmethod
    def get_images(self, page: int, normal_tags: list[str], virtual_tags: list[Callable[[], Expression]]) -> list[Image]: ...

    @abstractmethod
    def get_images_count(self, normal_tags: list[str], virtual_tags: list[Callable[[], Expression]]) -> int: ...

    @abstractmethod
    def get_tags(self) -> list[TagWithCount]: ...
