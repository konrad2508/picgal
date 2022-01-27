from models.virtual_tag import VirtualTag
from models.image import Image

def generate_virtual_tags():
    tags = [
        (VirtualTag('orientation')
            .add_subtag('portrait', lambda: Image.height > Image.width)
            .add_subtag('landscape', lambda: Image.height < Image.width)),
    ]

    return tags
