from dataclasses import dataclass


@dataclass
class ConfigData:
    highres: int
    veryhighres: int
    pictures_root: str
    previews_dir: str
    samples_dir: str
    count_per_page: int
    high_level_name: str
    low_level_name: str
    gpg_bin: str
    recipient: str
    save_dir: str
