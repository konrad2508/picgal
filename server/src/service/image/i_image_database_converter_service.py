from abc import ABC, abstractmethod

from model.image.data.image_data import ImageData
from model.image.data.count_data import CountData
from model.image.data.tag_data import TagData
from model.image.entity.image import Image
from model.image.object.tag_with_count import TagWithCount


class IImageDatabaseConverterService(ABC):
    @abstractmethod
    def convert_image(
            self,
            image: Image,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> ImageData:
        ...

    @abstractmethod
    def convert_count(self, count: int) -> CountData: ...

    @abstractmethod
    def convert_tag(self, tag: TagWithCount) -> TagData: ...
