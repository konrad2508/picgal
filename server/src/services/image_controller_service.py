class ImageControllerService(object):
    def __init__(self, repository, virtual_tag_repository, converter, path_resolver):
        self.repository = repository
        self.virtual_tag_repository = virtual_tag_repository
        self.converter = converter
        self.path_resolver = path_resolver

    def get_infos(self, image_url, preview_url, tags, page):
        normal_tag_array, virtual_tag_array = self.converter.convert_tagstring(tagstring=tags)

        images = self.repository.get_images(page, normal_tags=normal_tag_array, virtual_tags=virtual_tag_array)
        images = [ self.converter.convert_image(img, loc_original=image_url, loc_preview=preview_url) for img in images ]

        return images

    def modify_info(self, image_url, preview_url, id, modifications):
        image = self.repository.modify_image(id, modifications)
        image = self.converter.convert_image(image, loc_original=image_url, loc_preview=preview_url)

        return image

    def get_infos_count(self, tags):
        normal_tag_array, virtual_tag_array = self.converter.convert_tagstring(tagstring=tags)

        count = self.repository.get_images_count(normal_tags=normal_tag_array, virtual_tags=virtual_tag_array)
        count = self.converter.convert_count(count)

        return count

    def get_favourite_infos(self, image_url, preview_url, page):
        images = self.repository.get_favourite_images(page)
        images = [ self.converter.convert_image(img, loc_original=image_url, loc_preview=preview_url) for img in images ]

        return images

    def get_favourite_infos_count(self):
        count = self.repository.get_favourite_images_count()
        count = self.converter.convert_count(count)

        return count

    def get_tags(self):
        normal_tags = self.repository.get_tags()
        normal_tags = [ self.converter.convert_tags(normal_tag) for normal_tag in normal_tags ]

        virtual_tags = self.virtual_tag_repository.get_virtual_tags()
        virtual_tags = [ self.converter.convert_virtual_tags(virtual_tag) for virtual_tag in virtual_tags ]

        tags = normal_tags + virtual_tags

        return tags

    def get_image_path(self, id):
        image = self.repository.get_image(id)

        try:
            return self.path_resolver.resolve_path(image.file)

        except AttributeError:
            raise FileNotFoundError()

    def get_preview_path(self, id):
        image = self.repository.get_image(id)

        try:
            return self.path_resolver.resolve_path(image.preview)

        except AttributeError:
            raise FileNotFoundError()
