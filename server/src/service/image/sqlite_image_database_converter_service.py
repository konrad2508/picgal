import math
import time

import playhouse.shortcuts

import config
from model.image.data.image_data import ImageData
from model.image.data.count_data import CountData
from model.image.data.tag_data import TagData
from model.image.enum.tag_type import TagType
from model.image.enum.tag_category import TagCategory
from model.image.entity.image import Image
from model.image.object.tag_with_count import TagWithCount
from service.image.i_image_database_converter_service import IImageDatabaseConverterService


class SqliteImageDatabaseConverterService(IImageDatabaseConverterService):
    def convert_image(
            self,
            image: Image,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> ImageData:
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

    def convert_tag(self, tag: TagWithCount) -> TagData:
        converted_tag = TagData(
            id=tag.tag_id,
            name=tag.name.lower(),
            type=TagType(tag.type),
            count=tag.count,
            tag_type=TagCategory.NORMAL
        )

        return converted_tag
