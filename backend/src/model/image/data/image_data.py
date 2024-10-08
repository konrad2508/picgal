from dataclasses import dataclass


@dataclass
class ImageData:
    id: int
    lowlevel: list[str]
    highlevel: list[str]
    general: list[str]
    meta: list[str]
    file: str
    width: int
    height: int
    favourite: bool
    encrypted: bool
    created_time: str
    path: str | None
    preview: str | None
    sample: str | None
