from typing import Callable

from model.image.entity.subtag_condition import SubtagCondition
from service.image.i_image_request_converter_service import IImageRequestConverterService


class ImageRequestConverterService(IImageRequestConverterService):
    def convert_tagstring(
            self,
            get_conditions: Callable[[list[str]], list[SubtagCondition]],
            tagstring: str | None = None) -> tuple[list[str] | None, list[SubtagCondition] | None]:
        if not tagstring:
            return None, None

        tag_array = [ tag.lower().replace('_', ' ') for tag in tagstring.split(' ') ]

        normal_tag_array = [ tag for tag in tag_array if ':' not in tag ]
        virtual_tag_array = get_conditions([ tag for tag in tag_array if ':' in tag ])

        if len(normal_tag_array) == 0:
            normal_tag_array = None

        if len(virtual_tag_array) == 0:
            virtual_tag_array = None

        return normal_tag_array, virtual_tag_array
