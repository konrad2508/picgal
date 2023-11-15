from abc import ABC, abstractmethod

from model.image.data.virtual_tag_data import VirtualTagData
from model.image.entity.virtual_tag import VirtualTag


class IVirtualTagDatabaseConverterService(ABC):
    @abstractmethod
    def convert_virtual_tag(self, virtual_tag: VirtualTag) -> VirtualTagData: ...
