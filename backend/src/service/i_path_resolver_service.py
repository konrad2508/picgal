from abc import ABC, abstractmethod


class IPathResolverService(ABC):
    @abstractmethod
    def resolve_path(self, path_prefix: str, path: str) -> str: ...
