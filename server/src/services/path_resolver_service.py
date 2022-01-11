import sys
from pathlib import Path

class PathResolverService(object):
    def resolve_path(self, path):
        if getattr(sys, 'frozen', False) and not Path(path).is_absolute():
            basedir = sys.executable
            last_dir = basedir.rfind('/')
            basedir = basedir[:last_dir + 1]

            return basedir + path
        
        else:
            return path
