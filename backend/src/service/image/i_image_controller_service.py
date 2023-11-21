from abc import ABC, abstractmethod

from model.image.data.count_data import CountData
from model.image.data.download_result import DownloadResult
from model.image.data.image_data import ImageData
from model.image.data.tag_data import TagData
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.data.encrypt_result import EncryptResult
from model.image.enum.view_encrypted import ViewEncrypted
from model.image.request.download_request import DownloadRequest
from model.image.request.image_modification_request import ImageModificationRequest


class IImageControllerService(ABC):
    @abstractmethod
    def get_infos(self, image_url: str, preview_url: str, sample_url: str, tags: str | None, page: int, view_encrypted: ViewEncrypted) -> list[ImageData]: ...

    @abstractmethod
    def modify_info_batch(self, image_url: str, preview_url: str, sample_url: str, batch_modifications: ImageModificationRequest) -> list[ImageData]: ...

    @abstractmethod
    def modify_info(self, image_url: str, preview_url: str, sample_url: str, id: int, modifications: ImageModificationRequest) -> ImageData: ...

    @abstractmethod
    def get_infos_count(self, tags: str | None, view_encrypted: ViewEncrypted) -> CountData: ...

    @abstractmethod
    def get_tags(self, view_encrypted: ViewEncrypted) -> list[TagData | VirtualTagData]: ...

    @abstractmethod
    def toggle_encrypt_files(self, images_to_encrypt: list[int]) -> EncryptResult: ...

    @abstractmethod
    def get_image_content(self, id: int) -> str: ...

    @abstractmethod
    def get_preview_content(self, id: int) -> str: ...

    @abstractmethod
    def get_sample_content(self, id: int) -> str: ...

    @abstractmethod
    def download_image(self, id: int, filename: DownloadRequest) -> DownloadResult: ...
