from dataclasses import dataclass


@dataclass
class CountData:
    images_count: int
    images_per_page: int
    pages_count: int
