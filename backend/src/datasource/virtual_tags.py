from model.image.entity.image import Image
from model.image.entity.inmemory.subtag_condition import SubtagCondition
from model.image.entity.inmemory.virtual_tag import VirtualTag


def generate_virtual_tags() -> list[VirtualTag]:
    tags = [
        (VirtualTag('orientation')
            .add_subtag('portrait', SubtagCondition(lambda: Image.height > Image.width))
            .add_subtag('landscape', SubtagCondition(lambda: Image.height < Image.width))
            .add_subtag('square', SubtagCondition(lambda: Image.height == Image.width))),

        (VirtualTag('favourite')
            .add_subtag('yes', SubtagCondition(lambda: Image.favourite == True))
            .add_subtag('no', SubtagCondition(lambda: Image.favourite == False))),

        (VirtualTag('encrypted')
            .add_subtag('yes', SubtagCondition(lambda: Image.encrypted == True))
            .add_subtag('no', SubtagCondition(lambda: Image.encrypted == False))),

        (VirtualTag('file')
            .add_subtag('png', SubtagCondition(lambda: Image.file.endswith('.png')))
            .add_subtag('jpg', SubtagCondition(lambda: Image.file.endswith('.jpg') | Image.file.endswith('.jpeg')))
            .add_subtag('webp', SubtagCondition(lambda: Image.file.endswith('.webp')))
            .add_subtag('gif', SubtagCondition(lambda: Image.file.endswith('.gif')))),
    ]

    return tags
