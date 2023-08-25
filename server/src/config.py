import json


class Config:
    def __init__(self, config_path: str) -> None:
        self._path = config_path

        with open(self._path) as cfg_file:
            cfg_content = cfg_file.read()
            cfg = json.loads(cfg_content)
        
        self.HOST: str = cfg['host']
        self.PORT: int = cfg['port']
        self.ROUTE_PREFIX: str = cfg['routePrefix']

        self.SEP: str = cfg['sep']
        self.HIGHRES: int = cfg['highres']
        self.ABSURDRES: int = cfg['absurdres']

        self.DATABASE_PATH: str = cfg['databasePath']

        self.PICTURES_ROOT: str = cfg['picturesRoot']

        self.PREVIEWS_DIR: str = cfg['previewsDir']
        self.PREVIEW_SIZE: tuple[int, int] = cfg['previewSize']

        self.SAMPLES_DIR: str = cfg['samplesDir']
        self.SAMPLE_SIZE: tuple[int, int] = cfg['sampleSize']

        self.COUNT_PER_PAGE: int = cfg['countPerPage']


conf = Config('../../config.json')
