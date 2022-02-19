from dataclasses import dataclass

from model.image.enum.tag_category import TagCategory


@dataclass
class SubtagData:
    name: str
    tag_type: TagCategory
