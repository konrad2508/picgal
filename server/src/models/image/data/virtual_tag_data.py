from dataclasses import dataclass

from enums.tag_category import TagCategory
from models.image.data.subtag_data import SubtagData


@dataclass
class VirtualTagData:
    name: str
    subtags: list[SubtagData]
    tag_type: TagCategory
