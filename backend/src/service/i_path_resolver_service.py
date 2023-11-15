from abc import ABC, abstractmethod


class IPathResolverService(ABC):
    @abstractmethod
    def resolve_path(self, path: str) -> str: ...
