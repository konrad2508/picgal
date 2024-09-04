from abc import ABC, abstractmethod


class IImageRequestConverterService(ABC):
    @abstractmethod
    def convert_tagstring(
            self,
            tagstring: str | None = None) -> tuple[list[str] | None, list[str] | None]:
        ...
