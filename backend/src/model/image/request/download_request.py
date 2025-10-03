from __future__ import annotations
from dataclasses import dataclass


@dataclass
class DownloadRequest:
    filename: str

    @classmethod
    def from_json(cls, json: dict[str, str]) -> DownloadRequest:
        return cls(
            filename=json['filename']
        )
