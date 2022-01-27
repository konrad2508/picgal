import config
from peewee import DoesNotExist, fn
from models.base_model import db
from models.image import Image
from models.tag import Tag
from models.image_tag import ImageTag
from enums.tag_types import TAG_TYPE

class ImageRepository(object):
    def __init__(self):
        self.db = db

    def get_image(self, id):
        try:
            with self.db.atomic():
                image = (Image.get_by_id(id))
        
        except DoesNotExist:
            return {}

        return image

    def modify_image(self, id, modifications):
        # modifications:
        # {
        #     charactersAdded: [],
        #     charactersRemoved: [],
        #     sourcesAdded: [],
        #     sourcesRemoved: [],
        #     generalAdded: [],
        #     generalRemoved: [],
        #     metaAdded: [],
        #     metaRemoved: [],
        #     toggleFavourite: bool
        # }
        with self.db.atomic():
            for newCharacterTag in modifications['charactersAdded']:
                self._add_tag_to_image(id, newCharacterTag, TAG_TYPE['character'])

            for toDelCharacterTag in modifications['charactersRemoved']:
                self._delete_tag_to_image(id, toDelCharacterTag)

            for newSourcesTag in modifications['sourcesAdded']:
                self._add_tag_to_image(id, newSourcesTag, TAG_TYPE['source'])

            for toDelSourcesTag in modifications['sourcesRemoved']:
                self._delete_tag_to_image(id, toDelSourcesTag)

            for newGeneralTag in modifications['generalAdded']:
                self._add_tag_to_image(id, newGeneralTag, TAG_TYPE['general'])

            for toDelGeneralTag in modifications['generalRemoved']:
                self._delete_tag_to_image(id, toDelGeneralTag)

            for newMetaTag in modifications['metaAdded']:
                self._add_tag_to_image(id, newMetaTag, TAG_TYPE['meta'])

            for toDelMetaTag in modifications['metaRemoved']:
                self._delete_tag_to_image(id, toDelMetaTag)

            if modifications['toggleFavourite']:
                Image.update(favourite=(~ Image.favourite)).where(Image.image_id == id).execute()

            modified_image = Image.get_by_id(id)

        return modified_image

    def get_all_images(self, page):
        with self.db.atomic():
            images = (Image
                        .select()
                        .order_by(Image.created_time.desc())
                        .paginate(page, paginate_by=config.COUNT_PER_PAGE))
        
        return images

    def get_tagged_images(self, page, normal_tags=None, virtual_tags=None):
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

    def get_all_images_count(self):
        with self.db.atomic():
            count = (Image
                        .select(fn.Count())
                        .scalar())

        if count is None:
            count = 0

        return count

    def get_tagged_images_count(self, normal_tags=None, virtual_tags=None):
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

    def get_favourite_images(self, page):
        with self.db.atomic():
            images = (Image
                        .select()
                        .where(Image.favourite == True)
                        .order_by(Image.created_time.desc())
                        .paginate(page, paginate_by=config.COUNT_PER_PAGE))
        
        return images

    def get_favourite_images_count(self):
        with self.db.atomic():
            count = (Image
                        .select(fn.Count())
                        .where(Image.favourite == True)
                        .scalar())
        
        if count is None:
            count = 0

        return count

    def get_tags(self):
        with self.db.atomic():
            it = ImageTag.alias()
            tag_count = (it
                            .select(fn.Count())
                            .where(Tag.tag_id == it.tag_id))
            tags = (Tag
                        .select(Tag.tag_id, Tag.name, Tag.type, tag_count.alias('count'))
                        .where(tag_count > 0))
        
        return tags

    def _add_tag_to_image(self, image_id, tag_name, tag_type):
        tag, _ = Tag.get_or_create(name=tag_name.lower(), type=tag_type)
        ImageTag.create(image_id=image_id, tag_id=tag.tag_id)

    def _delete_tag_to_image(self, image_id, tag_name):
        tag = Tag.get(Tag.name == tag_name.lower())
        ImageTag.delete().where((ImageTag.image_id == image_id) & (ImageTag.tag_id == tag.tag_id)).execute()
