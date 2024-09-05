from abc import ABC, abstractmethod

from model.image.data.count_data import CountData
from model.image.data.image_data import ImageData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.enum.view_encrypted import ViewEncrypted
from model.image.request.image_modification_request import ImageModificationRequest


class IImageRepository(ABC):
    @abstractmethod
    def get_images(
            self,
            page: int,
            view_encrypted: ViewEncrypted,
            normal_tags: list[str],
            virtual_tags: list[str],
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> list[ImageData]:
        ...

    @abstractmethod
    def modify_image_batch(
            self,
            batch_modifications: ImageModificationRequest,
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
    def get_images_count(self, view_encrypted: ViewEncrypted, normal_tags: list[str], virtual_tags: list[str]) -> CountData: ...

    @abstractmethod
    def get_tags(self, view_encrypted: ViewEncrypted) -> list[TagData]: ...

    @abstractmethod
    def get_virtual_tags(self, view_encrypted: ViewEncrypted) -> list[VirtualTagData]: ...

    @abstractmethod
    def refresh_virtual_tags(self, ids: list[int]) -> None: ...

    @abstractmethod
    def get_image_original_file_location(self, id: int) -> tuple[str, bool]: ...

    @abstractmethod
    def get_image_preview_file_location(self, id: int) -> tuple[str, bool]: ...

    @abstractmethod
    def get_image_sample_file_location(self, id: int) -> tuple[str, bool]: ...

    @abstractmethod
    def get_image_file_location(self, id: int) -> tuple[str, str, str, bool]: ...

    @abstractmethod
    def toggle_encrypt_image(self, id: int) -> ImageData: ...
