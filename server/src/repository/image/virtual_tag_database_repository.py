from abc import ABC, abstractmethod
from typing import Callable

from peewee import Expression

from model.image.data.virtual_tag_data import VirtualTagData


class VirtualTagDatabaseRepository(ABC):
    @abstractmethod
    def get_virtual_tags(self) -> list[VirtualTagData]: ...

    @abstractmethod
    def get_conditions(self, virtual_tags: list[str]) -> list[Callable[[], Expression]]: ...
