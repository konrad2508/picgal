from dataclasses import dataclass

from enums.tag_category import TagCategory


@dataclass
class SubtagData:
    name: str
    tag_type: TagCategory
