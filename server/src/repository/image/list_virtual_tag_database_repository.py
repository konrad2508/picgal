from typing import Callable

from peewee import Expression

from datasource.virtual_tags import generate_virtual_tags
from model.image.entity.virtual_tag import VirtualTag
from repository.image.virtual_tag_database_repository import VirtualTagDatabaseRepository


class ListVirtualTagDatabaseRepository(VirtualTagDatabaseRepository):
    def __init__(self) -> None:
        self.tags = generate_virtual_tags()

    def get_virtual_tags(self) -> list[VirtualTag]:
        return self.tags

    def get_conditions(self, virtual_tags: list[str]) -> list[Callable[[], Expression]]:
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
