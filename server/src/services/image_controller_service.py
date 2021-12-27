class ImageControllerService(object):
    def __init__(self, repository, converter):
        self.repository = repository
        self.converter = converter

    def get_all_infos(self, image_url, preview_url, page):
        images = self.repository.get_all_images(page)
        images = [ self.converter.convert_image(img, loc_original=image_url, loc_preview=preview_url) for img in images ]

        return images

    def get_tagged_infos(self, image_url, preview_url, tags, page):
        tag_array = tags.split(' ')
        tag_array = list(map(lambda e: e.lower().replace('_', ' '), tag_array))

        images = self.repository.get_tagged_images(tag_array, page)
        images = [ self.converter.convert_image(img, loc_original=image_url, loc_preview=preview_url) for img in images ]

        return images

    def modify_info(self, image_url, preview_url, id, modifications):
        image = self.repository.modify_image(id, modifications)
        image = self.converter.convert_image(image, loc_original=image_url, loc_preview=preview_url)

        return image

    def get_all_infos_count(self):
        count = self.repository.get_all_images_count()
        count = self.converter.convert_count(count)

        return count

    def get_tagged_infos_count(self, tags):
        tag_array = tags.split(' ')
        tag_array = list(map(lambda e: e.lower().replace('_', ' '), tag_array))

        count = self.repository.get_tagged_images_count(tag_array)
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
        tags = self.repository.get_tags()
        tags = [ self.converter.convert_tags(tag) for tag in tags ]

        return tags

    def get_image_path(self, id):
        image = self.repository.get_image(id)

        try:
            return image.file

        except AttributeError:
            raise FileNotFoundError()

    def get_preview_path(self, id):
        image = self.repository.get_image(id)

        try:
            return image.preview

        except AttributeError:
            raise FileNotFoundError()
