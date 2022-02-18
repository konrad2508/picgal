import json


with open('../../config.json') as cfg_file:
    cfg_content = cfg_file.read()
    cfg = json.loads(cfg_content)

HOST: str = cfg['host']
PORT: int = cfg['port']
ROUTE_PREFIX: str = cfg['routePrefix']

SEP: str = cfg['sep']
HIGHRES: int = cfg['highres']
ABSURDRES: int = cfg['absurdres']

DATABASE_PATH: str = cfg['databasePath']

PICTURES_ROOT: str = cfg['picturesRoot']

PREVIEWS_DIR: str = cfg['previewsDir']
PREVIEW_SIZE: list[int] = cfg['previewSize']

SAMPLES_DIR: str = cfg['samplesDir']
SAMPLE_SIZE: list[int] = cfg['sampleSize']

COUNT_PER_PAGE: int = cfg['countPerPage']
