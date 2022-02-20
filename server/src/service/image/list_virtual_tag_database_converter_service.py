from model.image.data.subtag_data import SubtagData
from model.image.data.virtual_tag_data import VirtualTagData
from model.image.entity.virtual_tag import VirtualTag
from model.image.enum.tag_category import TagCategory
from service.image.i_virtual_tag_database_converter_service import IVirtualTagDatabaseConverterService


class ListVirtualTagDatabaseConverterService(IVirtualTagDatabaseConverterService):
    def convert_virtual_tag(self, virtual_tag: VirtualTag) -> VirtualTagData:
        converted_virtual_tag = VirtualTagData(
            name=virtual_tag.name,
            subtags=[ SubtagData(name=f'{virtual_tag.name}:{subtag.name}', tag_type=TagCategory.NORMAL) for subtag in virtual_tag.subtags ],
            tag_type=TagCategory.VIRTUAL
        )

        return converted_virtual_tag
