from abc import ABC, abstractmethod
from typing import Callable

from peewee import Expression

from model.image.entity.image import Image
from model.image.object.tag_with_count import TagWithCount
from model.image.entity.virtual_tag import VirtualTag
from model.image.data.image_data import ImageData
from model.image.data.count_data import CountData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData


class ImageConverterService(ABC):
    @abstractmethod
    def convert_image(self, image: Image, loc_original: str | None = None, loc_preview: str | None = None, loc_sample: str | None = None) -> ImageData: ...

    @abstractmethod
    def convert_count(self, count: int) -> CountData: ...

    @abstractmethod
    def convert_tags(self, tag: TagWithCount) -> TagData: ...

    @abstractmethod
    def convert_virtual_tag(self, virtual_tag: VirtualTag) -> VirtualTagData: ...

    @abstractmethod
    def convert_tagstring(
            self,
            get_conditions: Callable[[list[str]], list[Callable[[], Expression]]],
            tagstring: str | None = None) -> tuple[list[str] | None, list[Callable[[], Expression]] | None]:
        ...
