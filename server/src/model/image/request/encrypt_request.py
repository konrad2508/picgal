from __future__ import annotations
from dataclasses import dataclass


@dataclass
class EncryptRequest:
    ids: list[int]

    @classmethod
    def from_json(cls, json: dict[str, str]) -> EncryptRequest:
        return cls(
            ids=json['ids']
        )
