from dataclasses import dataclass

from model.image.enum.tag_category import TagCategory
from model.image.enum.tag_type import TagType


@dataclass
class SubtagData:
    name: str
    tag_category: TagCategory
    tag_type: TagType
    count: int
