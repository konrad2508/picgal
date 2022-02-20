from model.image.entity.image import Image
from model.image.entity.subtag_condition import SubtagCondition
from model.image.entity.virtual_tag import VirtualTag


def generate_virtual_tags() -> list[VirtualTag]:
    tags = [
        (VirtualTag('orientation')
            .add_subtag('portrait', SubtagCondition(lambda: Image.height > Image.width))
            .add_subtag('landscape', SubtagCondition(lambda: Image.height < Image.width))),

        (VirtualTag('favourite')
            .add_subtag('yes', SubtagCondition(lambda: Image.favourite == True))
            .add_subtag('no', SubtagCondition(lambda: Image.favourite == False)))
    ]

    return tags
