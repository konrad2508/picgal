from abc import ABC, abstractmethod
from typing import Callable

from peewee import ModelSelect, Expression

from models.image.image import Image
from models.image.request.image_modification_request import ImageModificationRequest


class ImageRepository(ABC):
    @abstractmethod
    def get_image(self, id: int) -> Image: ...

    @abstractmethod
    def modify_image(self, id: int, modifications: ImageModificationRequest) -> Image: ...

    @abstractmethod
    def get_images(self, page: int, normal_tags: list[str], virtual_tags: list[Callable[[], Expression]]) -> ModelSelect: ...

    @abstractmethod
    def get_images_count(self, normal_tags: list[str], virtual_tags: list[Callable[[], Expression]]) -> int: ...

    @abstractmethod
    def get_tags(self) -> ModelSelect: ...
