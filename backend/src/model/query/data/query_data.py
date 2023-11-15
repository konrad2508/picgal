from dataclasses import dataclass


@dataclass
class QueryData:
    id: int
    name: str
    query: str
