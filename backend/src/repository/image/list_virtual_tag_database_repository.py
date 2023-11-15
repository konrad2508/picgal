from datasource.virtual_tags import generate_virtual_tags
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.entity.subtag_condition import SubtagCondition
from repository.image.i_virtual_tag_database_repository import IVirtualTagDatabaseRepository
from service.image.i_virtual_tag_database_converter_service import IVirtualTagDatabaseConverterService


class ListVirtualTagDatabaseRepository(IVirtualTagDatabaseRepository):
    def __init__(self, converter: IVirtualTagDatabaseConverterService) -> None:
        self.tags = generate_virtual_tags()
        self.virtual_tag_database_converter = converter

    def get_virtual_tags(self) -> list[VirtualTagData]:
        virtual_tags = [ self.virtual_tag_database_converter.convert_virtual_tag(tag) for tag in self.tags ]

        return virtual_tags

    def get_conditions(self, virtual_tags: list[str]) -> list[SubtagCondition]:
        conditions = []

        splitter_virtual_tags = [ tag.split(':', 1) for tag in virtual_tags ]
        for virtual_tag in splitter_virtual_tags:
            try:
                virtual_tag_object = [ tag for tag in self.tags if tag.name == virtual_tag[0] ][0]
                subtag_object = [ subtag for subtag in virtual_tag_object.subtags if subtag.name == virtual_tag[1] ][0]
                
                conditions.append(subtag_object.condition)

            except IndexError:
                continue

        return conditions
