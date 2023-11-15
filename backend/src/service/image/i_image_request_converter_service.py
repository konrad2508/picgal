from abc import ABC, abstractmethod
from typing import Callable

from model.image.entity.subtag_condition import SubtagCondition


class IImageRequestConverterService(ABC):
    @abstractmethod
    def convert_tagstring(
            self,
            get_conditions: Callable[[list[str]], list[SubtagCondition]],
            tagstring: str | None = None) -> tuple[list[str] | None, list[SubtagCondition] | None]:
        ...
