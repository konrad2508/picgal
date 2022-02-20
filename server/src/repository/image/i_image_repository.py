from repository.image.i_image_database_repository import IImageDatabaseRepository
from repository.image.i_virtual_tag_database_repository import IVirtualTagDatabaseRepository


class IImageRepository(IImageDatabaseRepository, IVirtualTagDatabaseRepository): ...
