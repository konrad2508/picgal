import sys
from pathlib import Path

import config
from service.i_path_resolver_service import IPathResolverService


class PathResolverService(IPathResolverService):
    def resolve_path(self, path: str) -> str:
        if getattr(sys, 'frozen', False) and not Path(path).is_absolute():
            basedir = sys.executable
            last_dir = basedir.rfind(config.SEP)
            basedir = basedir[:last_dir + 1]

            return basedir + path
        
        else:
            return path
