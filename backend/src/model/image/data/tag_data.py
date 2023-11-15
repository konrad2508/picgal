from dataclasses import dataclass

from model.image.enum.tag_category import TagCategory
from model.image.enum.tag_type import TagType


@dataclass
class TagData:
    id: int
    name: str
    type: TagType
    count: int
    tag_type: TagCategory
