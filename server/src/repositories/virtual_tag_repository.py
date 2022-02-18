from abc import ABC, abstractmethod
from typing import Callable

from peewee import Expression

from models.image.virtual_tag import VirtualTag


class VirtualTagRepository(ABC):
    @abstractmethod
    def get_virtual_tags(self) -> list[VirtualTag]: ...

    @abstractmethod
    def get_conditions(self, virtual_tags: list[list[str]]) -> list[Callable[[], Expression]]: ...
