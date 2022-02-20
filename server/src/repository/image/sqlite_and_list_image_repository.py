from repository.image.image_repository import ImageRepository
from repository.image.sqlite_image_database_repository import SqliteImageDatabaseRepository
from repository.image.list_virtual_tag_database_repository import ListVirtualTagDatabaseRepository
from service.image.virtual_tag_database_converter_service import VirtualTagDatabaseConverterService
from service.image.image_database_converter_service import ImageDatabaseConverterService


class SqliteAndListImageRepository(ImageRepository, SqliteImageDatabaseRepository, ListVirtualTagDatabaseRepository):
    def __init__(
            self,
            image_converter: ImageDatabaseConverterService,
            virtual_tag_converter: VirtualTagDatabaseConverterService) -> None:
        SqliteImageDatabaseRepository.__init__(self, image_converter)
        ListVirtualTagDatabaseRepository.__init__(self, virtual_tag_converter)
