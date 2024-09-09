from __future__ import annotations
from dataclasses import dataclass


@dataclass
class ScanRequest:
    scan_dir: str
    out_dir: str

    @classmethod
    def from_json(cls, json: dict[str, str]) -> ScanRequest:
        return cls(
            scan_dir=json['scan_dir'],
            out_dir=json['out_dir']
        )
