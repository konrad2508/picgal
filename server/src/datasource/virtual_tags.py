from model.image.entity.image import Image
from model.image.entity.virtual_tag import VirtualTag


def generate_virtual_tags() -> list[VirtualTag]:
    tags = [
        (VirtualTag('orientation')
            .add_subtag('portrait', lambda: Image.height > Image.width)
            .add_subtag('landscape', lambda: Image.height < Image.width)),

        (VirtualTag('favourite')
            .add_subtag('yes', lambda: Image.favourite == True)
            .add_subtag('no', lambda: Image.favourite == False))
    ]

    return tags
