from __future__ import annotations
from dataclasses import dataclass


@dataclass
class ConfigRequest:
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

    @classmethod
    def from_json(cls, json: dict[str, str]) -> ConfigRequest:
        return cls(
            highres=int(json['highres']),
            veryhighres=int(json['veryhighres']),
            pictures_root=json['pictures_root'],
            previews_dir=json['previews_dir'],
            samples_dir=json['samples_dir'],
            count_per_page=int(json['count_per_page']),
            high_level_name=json['high_level_name'],
            low_level_name=json['low_level_name'],
            gpg_bin=json['gpg_bin'],
            recipient=json['recipient'],
            save_dir=json['save_dir']
        )
