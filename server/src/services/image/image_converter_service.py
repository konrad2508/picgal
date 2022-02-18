import math
import time
from typing import Callable

import playhouse.shortcuts
from peewee import Expression

import config
from enums.tag_type import TagType
from enums.tag_category import TagCategory
from models.image.image import Image
from models.image.tag import Tag
from models.image.virtual_tag import VirtualTag
from models.image.data.image_data import ImageData
from models.image.data.count_data import CountData
from models.image.data.tag_data import TagData
from models.image.data.virtual_tag_data import VirtualTagData
from models.image.data.subtag_data import SubtagData
from repositories.virtual_tag_repository import VirtualTagRepository


class ImageConverterService(object):
    def __init__(self, virtual_tag_repository: VirtualTagRepository):
        self.virtual_tag_repository = virtual_tag_repository

    def convert_image(self, image: Image, loc_original: str = None, loc_preview: str = None, loc_sample: str = None) -> ImageData:
        dict_image = playhouse.shortcuts.model_to_dict(image, backrefs=True)

        tags = [ { 'name': t['tag_id']['name'], 'type': t['tag_id']['type'] } for t in dict_image['imagetag_set'] ]

        converted_image = ImageData(
            id=dict_image['image_id'],
            characters=[ tag['name'] for tag in tags if tag['type'] == TagType.CHARACTER ],
            sources=[ tag['name'] for tag in tags if tag['type'] == TagType.SOURCE ],
            general=[ tag['name'] for tag in tags if tag['type'] == TagType.GENERAL ],
            meta=[ tag['name'] for tag in tags if tag['type'] == TagType.META ],
            file=dict_image['file'],
            width=dict_image['width'],
            height=dict_image['height'],
            favourite=dict_image['favourite'],
            created_time=time.strftime('%Y-%m-%d', time.localtime(dict_image['created_time'])),
            path=f'{loc_original}/{dict_image["image_id"]}' if loc_original else None,
            preview=f'{loc_preview}/{dict_image["image_id"]}' if loc_preview else None,
            sample=f'{loc_sample}/{dict_image["image_id"]}' if loc_sample else None
        )

        return converted_image

    def convert_count(self, count: int) -> CountData:
        converted_count = CountData(
            images_count=count,
            images_per_page=config.COUNT_PER_PAGE,
            pages_count=math.ceil(count / config.COUNT_PER_PAGE)
        )

        return converted_count

    def convert_tags(self, tag: Tag) -> TagData:
        converted_tag = TagData(
            id=tag.tag_id,
            name=tag.name.lower(),
            type=TagType(tag.type),
            count=tag.count,
            tag_type=TagCategory.NORMAL
        )

        return converted_tag

    def convert_virtual_tag(self, virtual_tag: VirtualTag) -> VirtualTagData:
        converted_virtual_tag = VirtualTagData(
            name=virtual_tag.name,
            subtags=[ SubtagData(name=f'{virtual_tag.name}:{subtag.name}', tag_type=TagCategory.NORMAL) for subtag in virtual_tag.subtags ],
            tag_type=TagCategory.VIRTUAL
        )

        return converted_virtual_tag

    def convert_tagstring(self, tagstring: str = None) -> tuple[list[str] | None, list[Callable[[], Expression]] | None]:
        if not tagstring:
            return None, None

        tag_array = tagstring.split(' ')
        tag_array = list(map(lambda e: e.lower().replace('_', ' '), tag_array))
        normal_tag_array = list(filter(lambda e: ':' not in e, tag_array))

        if len(normal_tag_array) == 0:
            normal_tag_array = None

        tag_array = list(filter(lambda e: ':' in e, tag_array))
        tag_array = list(map(lambda e: e.split(':'), tag_array))
        virtual_tag_array = self.virtual_tag_repository.get_conditions(tag_array)

        if len(virtual_tag_array) == 0:
            virtual_tag_array = None

        return normal_tag_array, virtual_tag_array
