from abc import ABC, abstractmethod

from model.image.data.count_data import CountData
from model.image.data.image_data import ImageData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.request.image_modification_request import ImageModificationRequest


class IImageControllerService(ABC):
    @abstractmethod
    def get_infos(self, image_url: str, preview_url: str, sample_url: str, tags: str | None, page: int) -> list[ImageData]: ...

    @abstractmethod
    def modify_info(self, image_url: str, preview_url: str, sample_url: str, id: int, modifications: ImageModificationRequest) -> ImageData: ...

    @abstractmethod
    def get_infos_count(self, tags: str | None) -> CountData: ...

    @abstractmethod
    def get_tags(self) -> list[TagData | VirtualTagData]: ...

    @abstractmethod
    def get_image_path(self, id: int) -> str: ...

    @abstractmethod
    def get_preview_path(self, id: int) -> str: ...

    @abstractmethod
    def get_sample_path(self, id: int) -> str: ...
