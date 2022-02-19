from repository.image.image_repository import ImageRepository
from repository.image.sqlite_image_database_repository import SqliteImageDatabaseRepository
from repository.image.list_virtual_tag_database_repository import ListVirtualTagDatabaseRepository


class SqliteAndListImageRepository(ImageRepository, SqliteImageDatabaseRepository, ListVirtualTagDatabaseRepository):
    def __init__(self) -> None:
        SqliteImageDatabaseRepository.__init__(self)
        ListVirtualTagDatabaseRepository.__init__(self)
