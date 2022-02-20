from abc import ABC, abstractmethod

from model.image.data.virtual_tag_data import VirtualTagData
from model.image.entity.subtag_condition import SubtagCondition


class IVirtualTagDatabaseRepository(ABC):
    @abstractmethod
    def get_virtual_tags(self) -> list[VirtualTagData]: ...

    @abstractmethod
    def get_conditions(self, virtual_tags: list[str]) -> list[SubtagCondition]: ...
