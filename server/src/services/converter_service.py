import time
import math
import playhouse.shortcuts
import config
from enums.tag_types import TAG_TYPE

class ConverterService(object):
    def __init__(self, virtual_tag_repository):
        self.virtual_tag_repository = virtual_tag_repository

    def convert_image(self, image, loc_original=None, loc_preview=None):
        converted_image = playhouse.shortcuts.model_to_dict(image, backrefs=True)
        converted_image = self._modeldict_to_response(converted_image, loc_original, loc_preview)

        return converted_image

    def convert_count(self, count):
        converted_count = {
            'imagesCount': count,
            'imagesPerPage': config.COUNT_PER_PAGE,
            'pagesCount': math.ceil(count / config.COUNT_PER_PAGE)
        }

        return converted_count

    def convert_tags(self, tag):
        converted_tag = {
            'id': tag.tag_id,
            'name': tag.name.lower(),
            'type': tag.type,
            'count': tag.count,
            'tagType': 'normal'
        }

        return converted_tag

    def convert_virtual_tags(self, virtual_tag):
        converted_virtual_tag = {
            'name': virtual_tag.name,
            'subtags': [
                { 
                    'name': f'{virtual_tag.name}:{subtag.name}',
                    'tagType': 'normal'
                }
                for subtag in virtual_tag.subtags
            ],
            'tagType': 'virtual'
        }

        return converted_virtual_tag

    def convert_tagstring(self, tagstring):
        tag_array = tagstring.split(' ')
        tag_array = list(map(lambda e: e.lower().replace('_', ' '), tag_array))
        normal_tag_array = list(filter(lambda e: ':' not in e, tag_array))

        if len(normal_tag_array) == 0:
            normal_tag_array = None

        tag_array = list(filter(lambda e: ':' in e, tag_array))
        tag_array = list(map(lambda e: e.split(':'), tag_array))
        virtual_tag_array = self.virtual_tag_repository.get_conditions(tag_array)

        if len(virtual_tag_array) == 0:
            virtual_tag_array = None

        return normal_tag_array, virtual_tag_array

    def _modeldict_to_response(self, image, loc_original, loc_preview):
        tags = [ { 'name': t['tag_id']['name'], 'type': t['tag_id']['type'] } for t in image['imagetag_set'] ]

        img = {
            'id': image['image_id'],
            'characters': [],
            'sources': [],
            'general': [],
            'meta': [],
            'file': image['file'],
            'width': image['width'],
            'height': image['height'],
            'favourite': image['favourite'],
            'createdTime': time.strftime('%Y-%m-%d', time.localtime(image['created_time']))
        }

        if loc_original:
            img['path'] = f'{loc_original}/{img["id"]}'

        if loc_preview:
            img['preview'] = f'{loc_preview}/{img["id"]}'

        for tag in tags:
            if tag['type'] == TAG_TYPE['character']:
                img['characters'].append(tag['name'])

            elif tag['type'] == TAG_TYPE['source']:
                img['sources'].append(tag['name'])

            elif tag['type'] == TAG_TYPE['general']:
                img['general'].append(tag['name'])

            elif tag['type'] == TAG_TYPE['meta']:
                img['meta'].append(tag['name'])

            else:
                raise Exception

        return img

