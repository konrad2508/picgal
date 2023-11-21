from __future__ import annotations
from dataclasses import dataclass


@dataclass
class DownloadRequest:
    dir: str
    filename: str

    @classmethod
    def from_json(cls, json: dict[str, str]) -> DownloadRequest:
        return cls(
            dir=json['dir'],
            filename=json['filename']
        )
