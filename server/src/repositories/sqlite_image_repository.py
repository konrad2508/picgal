from typing import Callable
from peewee import DoesNotExist, fn, ModelSelect, Expression

import config
from enums.tag_type import TagType
from models.base_model import db
from models.image.image import Image
from models.image.tag import Tag
from models.image.image_tag import ImageTag
from models.image.request.image_modification_request import ImageModificationRequest
from repositories.image_repository import ImageRepository


class SqliteImageRepository(ImageRepository):
    def __init__(self) -> None:
        self.db = db

    def get_image(self, id: int) -> Image:
        try:
            with self.db.atomic():
                image = (Image.get_by_id(id))
        
        except DoesNotExist:
            return {}

        return image

    def modify_image(self, id: int, modifications: ImageModificationRequest) -> Image:
        with self.db.atomic():
            for tag in modifications.characters_added:
                self._add_tag_to_image(id, tag, TagType.CHARACTER)

            for tag in modifications.characters_removed:
                self._delete_tag_to_image(id, tag)

            for tag in modifications.sources_added:
                self._add_tag_to_image(id, tag, TagType.SOURCE)

            for tag in modifications.sources_removed:
                self._delete_tag_to_image(id, tag)

            for tag in modifications.general_added:
                self._add_tag_to_image(id, tag, TagType.GENERAL)

            for tag in modifications.general_removed:
                self._delete_tag_to_image(id, tag)

            for tag in modifications.meta_added:
                self._add_tag_to_image(id, tag, TagType.META)

            for tag in modifications.meta_removed:
                self._delete_tag_to_image(id, tag)

            if modifications.toggle_favourite:
                Image.update(favourite=(~ Image.favourite)).where(Image.image_id == id).execute()

            modified_image = Image.get_by_id(id)

        return modified_image

    def get_images(self, page: int, normal_tags: list[str] = None, virtual_tags: list[Callable[[], Expression]] = None) -> ModelSelect:
        with self.db.atomic():
            images = Image.select()

            if virtual_tags is not None:
                for virtual_tag in virtual_tags:
                    images = images.where(virtual_tag())

            if normal_tags is not None:
                images = (images
                            .join(ImageTag, on=ImageTag.image_id == Image.image_id)
                            .join(Tag, on=Tag.tag_id == ImageTag.tag_id)
                            .where(fn.Lower(Tag.name) << normal_tags)
                            .group_by(Image.image_id)
                            .having(fn.Count() == len(normal_tags)))

            images = (images
                        .order_by(Image.created_time.desc())
                        .paginate(page, paginate_by=config.COUNT_PER_PAGE))

        return images

    def get_images_count(self, normal_tags: list[str] = None, virtual_tags: list[Callable[[], Expression]] = None) -> int:
        with self.db.atomic():
            count = Image.select(fn.Count().over())

            if virtual_tags is not None:
                for virtual_tag in virtual_tags:
                    count = count.where(virtual_tag())
            
            if normal_tags is not None:
                count = (count
                            .join(ImageTag, on=ImageTag.image_id == Image.image_id)
                            .join(Tag, on=Tag.tag_id == ImageTag.tag_id)
                            .where(fn.Lower(Tag.name) << normal_tags)
                            .group_by(Image.image_id)
                            .having(fn.Count() == len(normal_tags)))

            count = count.scalar()

        if count is None:
            count = 0

        return count

    def get_tags(self) -> ModelSelect:
        with self.db.atomic():
            it = ImageTag.alias()
            tag_count = (it
                            .select(fn.Count())
                            .where(Tag.tag_id == it.tag_id))
            tags = (Tag
                        .select(Tag.tag_id, Tag.name, Tag.type, tag_count.alias('count'))
                        .where(tag_count > 0))
        
        return tags

    def _add_tag_to_image(self, image_id: int, tag_name: str, tag_type: int) -> None:
        tag, _ = Tag.get_or_create(name=tag_name.lower(), type=tag_type)
        ImageTag.create(image_id=image_id, tag_id=tag.tag_id)

    def _delete_tag_to_image(self, image_id: int, tag_name: str) -> None:
        tag = Tag.get(Tag.name == tag_name.lower())
        ImageTag.delete().where((ImageTag.image_id == image_id) & (ImageTag.tag_id == tag.tag_id)).execute()
