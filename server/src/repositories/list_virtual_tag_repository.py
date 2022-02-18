from typing import Callable

from peewee import Expression

from datasources.virtual_tags import generate_virtual_tags
from models.image.virtual_tag import VirtualTag
from repositories.virtual_tag_repository import VirtualTagRepository


class ListVirtualTagRepository(VirtualTagRepository):
    def __init__(self) -> None:
        self.tags = generate_virtual_tags()

    def get_virtual_tags(self) -> list[VirtualTag]:
        return self.tags

    def get_conditions(self, virtual_tags: list[list[str]]) -> list[Callable[[], Expression]]:
        conditions = []

        for virtual_tag in virtual_tags:
            try:
                virtual_tag_object = list(filter(lambda e: e.name == virtual_tag[0], self.tags))[0]
                subtag_object = list(filter(lambda e: e.name == virtual_tag[1], virtual_tag_object.subtags))[0]

                conditions.append(subtag_object.condition)

            except IndexError:
                continue

        return conditions
