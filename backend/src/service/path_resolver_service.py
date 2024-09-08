import sys
from pathlib import Path

from service.i_path_resolver_service import IPathResolverService


class PathResolverService(IPathResolverService):
    def resolve_path(self, path_prefix: str, path: str) -> str:
        resolved_path = Path(path_prefix) / Path(path).relative_to('/')

        if getattr(sys, 'frozen', False) and not Path(resolved_path).is_absolute():
            return str(Path(sys.executable).parent / resolved_path)

        else:
            return str(resolved_path)
