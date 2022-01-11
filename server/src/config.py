import json

cfg = json.loads(open('../../config.json').read())

HOST = cfg['host']
PORT = cfg['port']
ROUTE_PREFIX = cfg['routePrefix']

SEP = cfg['sep']
HIGHRES = cfg['highres']
ABSURDRES = cfg['absurdres']

DATABASE_PATH = cfg['databasePath']

PICTURES_ROOT = cfg['picturesRoot']

PREVIEWS_DIR = cfg['previewsDir']
PREVIEW_SIZE = cfg['previewSize']

COUNT_PER_PAGE = cfg['countPerPage']
