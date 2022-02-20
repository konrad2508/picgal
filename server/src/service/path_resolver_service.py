import sys
from pathlib import Path

from config import Config
from service.i_path_resolver_service import IPathResolverService


class PathResolverService(IPathResolverService):
    def __init__(self, cfg: Config) -> None:
        self.cfg = cfg

    def resolve_path(self, path: str) -> str:
        if getattr(sys, 'frozen', False) and not Path(path).is_absolute():
            basedir = sys.executable
            last_dir = basedir.rfind(self.cfg.SEP)
            basedir = basedir[:last_dir + 1]

            return basedir + path
        
        else:
            return path
