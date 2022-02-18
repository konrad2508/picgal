from dataclasses import dataclass

from enums.tag_category import TagCategory
from enums.tag_type import TagType


@dataclass
class TagData:
    id: int
    name: str
    type: TagType
    count: int
    tag_type: TagCategory
