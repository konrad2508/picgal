from peewee import SqliteDatabase, fn, DoesNotExist, IntegrityError

from config import Config
from model.image.enum.tag_type import TagType
from model.exception.database_integrity_violated import DatabaseIntegrityViolated
from model.exception.entity_not_found import EntityNotFound
from model.image.data.count_data import CountData
from model.image.data.image_data import ImageData
from model.image.data.tag_data import TagData
from model.image.entity.image import Image
from model.image.entity.image_tag import ImageTag
from model.image.entity.subtag_condition import SubtagCondition
from model.image.entity.tag import Tag
from model.image.enum.view_encrypted import ViewEncrypted
from model.image.request.image_modification_request import ImageModificationRequest
from repository.image.i_image_database_repository import IImageDatabaseRepository
from service.image.i_image_database_converter_service import IImageDatabaseConverterService


class SqliteImageDatabaseRepository(IImageDatabaseRepository):
    def __init__(self, db: SqliteDatabase, cfg: Config, converter: IImageDatabaseConverterService) -> None:
        self.db = db
        self.cfg = cfg
        self.image_database_converter = converter

    def get_images(
            self,
            page: int,
            view_encrypted: ViewEncrypted,
            normal_tags: list[str] = None,
            virtual_tags: list[SubtagCondition] = None,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> list[ImageData]:
        with self.db.atomic():
            images = Image.select()
            
            if view_encrypted != ViewEncrypted.YES:
                images = images.where(Image.encrypted == False)
            
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
                        .paginate(page, paginate_by=self.cfg.COUNT_PER_PAGE))

        images = [ self.image_database_converter.convert_image(img, loc_original, loc_preview, loc_sample) for img in images ]

        return images

    def modify_image_batch(
            self,
            batch_modifications: ImageModificationRequest,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> ImageData:
        try:
            modified_images = []

            with self.db.atomic():
                for id in batch_modifications.ids:
                    if not Image.select().where(Image.image_id == id).exists():
                        raise EntityNotFound

                    for tag in batch_modifications.characters_added:
                        self._add_tag_to_image(id, tag, TagType.CHARACTER)

                    for tag in batch_modifications.characters_removed:
                        self._delete_tag_to_image(id, tag)

                    for tag in batch_modifications.sources_added:
                        self._add_tag_to_image(id, tag, TagType.SOURCE)

                    for tag in batch_modifications.sources_removed:
                        self._delete_tag_to_image(id, tag)

                    for tag in batch_modifications.general_added:
                        self._add_tag_to_image(id, tag, TagType.GENERAL)

                    for tag in batch_modifications.general_removed:
                        self._delete_tag_to_image(id, tag)

                    for tag in batch_modifications.meta_added:
                        self._add_tag_to_image(id, tag, TagType.META)

                    for tag in batch_modifications.meta_removed:
                        self._delete_tag_to_image(id, tag)

                    if batch_modifications.toggle_favourite:
                        Image.update(favourite=(~ Image.favourite)).where(Image.image_id == id).execute()

                    modified_images.append(Image.get_by_id(id))

            modified_images = [
                self.image_database_converter.convert_image(modified_image, loc_original, loc_preview, loc_sample)
                for modified_image
                in modified_images
            ]

            return modified_images

        except IntegrityError:
            raise DatabaseIntegrityViolated

    def modify_image(
            self,
            id: int,
            modifications: ImageModificationRequest,
            loc_original: str | None = None,
            loc_preview: str | None = None,
            loc_sample: str | None = None) -> ImageData:
        try:
            with self.db.atomic():
                if not Image.select().where(Image.image_id == id).exists():
                    raise EntityNotFound

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

            modified_image = self.image_database_converter.convert_image(modified_image, loc_original, loc_preview, loc_sample)

            return modified_image

        except IntegrityError:
            raise DatabaseIntegrityViolated

    def get_images_count(self, view_encrypted: ViewEncrypted, normal_tags: list[str] = None, virtual_tags: list[SubtagCondition] = None) -> CountData:
        with self.db.atomic():
            count = Image.select(fn.Count().over())

            if view_encrypted != ViewEncrypted.YES:
                count = count.where(Image.encrypted == False)

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

        count = self.image_database_converter.convert_count(count)

        return count

    def get_tags(self, view_encrypted: ViewEncrypted) -> list[TagData]:
        with self.db.atomic():
            it = ImageTag.alias()
            tag_count = (it
                            .select(fn.Count())
                            .where(Tag.tag_id == it.tag_id))
            
            if view_encrypted == ViewEncrypted.NO:
                tag_count = (tag_count
                                .join(Image, on=Image.image_id == it.image_id)
                                .where(Image.encrypted == False))

            tags = (Tag
                        .select(Tag.tag_id, Tag.name, Tag.type, tag_count.alias('count'))
                        .where(tag_count > 0))
        
        tags = [ self.image_database_converter.convert_tag(tag) for tag in tags ]

        return tags

    def get_image_original_file_location(self, id: int) -> tuple[str, bool]:
        image = self._get_image_by_id(id)

        return image.file, image.encrypted

    def get_image_preview_file_location(self, id: int) -> tuple[str, bool]:
        image = self._get_image_by_id(id)

        return image.preview, image.encrypted

    def get_image_sample_file_location(self, id: int) -> tuple[str, bool]:
        image = self._get_image_by_id(id)

        return image.sample, image.encrypted

    def get_image_file_location(self, id: int) -> tuple[str, str, str, bool]:
        image = self._get_image_by_id(id)

        return image.file, image.preview, image.sample, image.encrypted

    def toggle_encrypt_image(self, id: int) -> ImageData:
        with self.db.atomic():
            Image.update(encrypted=(~ Image.encrypted)).where(Image.image_id == id).execute()

        image = Image.get_by_id(id)
        modified_image = self.image_database_converter.convert_image(image)

        return modified_image

    def _get_image_by_id(self, id: int) -> Image:
        try:
            with self.db.atomic():
                image = Image.get_by_id(id)

            return image
        
        except DoesNotExist:
            raise EntityNotFound

    def _add_tag_to_image(self, image_id: int, tag_name: str, tag_type: int) -> None:
        tag, _ = Tag.get_or_create(name=tag_name.lower(), type=tag_type)
        ImageTag.get_or_create(image_id=image_id, tag_id=tag.tag_id)

    def _delete_tag_to_image(self, image_id: int, tag_name: str) -> None:
        tag = Tag.get(Tag.name == tag_name.lower())
        ImageTag.delete().where((ImageTag.image_id == image_id) & (ImageTag.tag_id == tag.tag_id)).execute()
