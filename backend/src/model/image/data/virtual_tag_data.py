from dataclasses import dataclass

from model.image.enum.tag_category import TagCategory
from model.image.enum.tag_type import TagType
from model.image.data.subtag_data import SubtagData


@dataclass
class VirtualTagData:
    name: str
    subtags: list[SubtagData]
    tag_category: TagCategory
    tag_type: TagType
