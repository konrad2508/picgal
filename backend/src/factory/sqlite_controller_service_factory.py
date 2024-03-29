from peewee import SqliteDatabase

from config import Config
from factory.i_controller_service_factory import IControllerServiceFactory
from repository.image.sqlite_and_list_image_repository import SqliteAndListImageRepository
from repository.query.sqlite_query_repository import SqliteQueryRepository
from service.path_resolver_service import PathResolverService
from service.image.image_request_converter_service import ImageRequestConverterService
from service.image.image_controller_service import ImageControllerService
from service.image.i_image_controller_service import IImageControllerService
from service.image.list_virtual_tag_database_converter_service import ListVirtualTagDatabaseConverterService
from service.image.sqlite_image_database_converter_service import SqliteImageDatabaseConverterService
from service.query.i_query_controller_service import IQueryControllerService
from service.query.query_controller_service import QueryControllerService
from service.query.query_converter_service import QueryConverterService
from service.rpc.i_rpc_controller_service import IRPCControllerService
from service.rpc.rpc_controller_service import RPCControllerService


class SqliteControllerServiceFactory(IControllerServiceFactory):
    def __init__(self, db: SqliteDatabase, cfg: Config) -> None:
        self.db = db
        self.cfg = cfg

    def get_image_service(self) -> IImageControllerService:
        image_database_converter = SqliteImageDatabaseConverterService(self.cfg)
        virtual_tag_database_converter = ListVirtualTagDatabaseConverterService()
        image_repository = SqliteAndListImageRepository(self.db, self.cfg, image_database_converter, virtual_tag_database_converter)

        image_request_converter = ImageRequestConverterService()
        path_resolver = PathResolverService(self.cfg)
        image_service = ImageControllerService(image_repository, image_request_converter, path_resolver, self.cfg)

        return image_service

    def get_query_service(self) -> IQueryControllerService:
        query_repository = SqliteQueryRepository(self.db)
        query_converter = QueryConverterService()
        
        query_service = QueryControllerService(query_repository, query_converter)

        return query_service
    
    def get_rpc_service(self) -> IRPCControllerService:
        rpc_service = RPCControllerService(self.db, self.cfg)

        return rpc_service
