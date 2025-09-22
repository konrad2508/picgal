from __future__ import annotations
from dataclasses import dataclass


@dataclass
class ScanRequest:
    base_dir: str
    scan_dir: str
    out_dir: str

    @classmethod
    def from_json(cls, json: dict[str, str]) -> ScanRequest:
        return cls(
            base_dir=json['base_dir'] if 'base_dir' in json else '',
            scan_dir=json['scan_dir'],
            out_dir=json['out_dir']
        )
