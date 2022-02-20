from abc import ABC, abstractmethod
from typing import Callable

from peewee import Expression


class ImageRequestConverterService(ABC):
    @abstractmethod
    def convert_tagstring(
            self,
            get_conditions: Callable[[list[str]], list[Callable[[], Expression]]],
            tagstring: str | None = None) -> tuple[list[str] | None, list[Callable[[], Expression]] | None]:
        ...
