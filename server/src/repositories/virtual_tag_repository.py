from datasources.virtual_tags import generate_virtual_tags

class VirtualTagRepository(object):
    def __init__(self):
        self.tags = generate_virtual_tags()

    def get_virtual_tags(self):
        return self.tags

    def get_conditions(self, virtual_tags):
        conditions = []

        for virtual_tag in virtual_tags:
            try:
                virtual_tag_object = list(filter(lambda e: e.name == virtual_tag[0], self.tags))[0]
                subtag_object = list(filter(lambda e: e.name == virtual_tag[1], virtual_tag_object.subtags))[0]

                conditions.append(subtag_object.condition)
            
            except IndexError:
                continue

        return conditions
