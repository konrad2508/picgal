from __future__ import annotations
from dataclasses import dataclass


@dataclass
class QueryRequest:
    name: str
    query: str

    @classmethod
    def from_json(cls, json: dict[str, str]) -> QueryRequest:
        return cls(name=json['name'], query=json['query'])
