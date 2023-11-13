from dataclasses import dataclass
from model.image.data.image_data import ImageData


@dataclass
class EncryptResult:
    images: list[ImageData]
