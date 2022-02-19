from abc import ABC, abstractmethod


class PathResolverService(ABC):
    @abstractmethod
    def resolve_path(self, path: str) -> str: ...
