from config import Config
from repository.image.i_image_repository import IImageRepository
from repository.image.sqlite_image_database_repository import SqliteImageDatabaseRepository
from repository.image.list_virtual_tag_database_repository import ListVirtualTagDatabaseRepository
from service.image.i_virtual_tag_database_converter_service import IVirtualTagDatabaseConverterService
from service.image.i_image_database_converter_service import IImageDatabaseConverterService


class SqliteAndListImageRepository(IImageRepository, SqliteImageDatabaseRepository, ListVirtualTagDatabaseRepository):
    def __init__(
            self,
            cfg: Config,
            image_converter: IImageDatabaseConverterService,
            virtual_tag_converter: IVirtualTagDatabaseConverterService) -> None:
        SqliteImageDatabaseRepository.__init__(self, cfg, image_converter)
        ListVirtualTagDatabaseRepository.__init__(self, virtual_tag_converter)
