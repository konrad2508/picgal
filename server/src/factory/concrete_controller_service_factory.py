from factory.controller_service_factory import ControllerServiceFactory
from repository.image.sqlite_and_list_image_repository import SqliteAndListImageRepository
from repository.query.sqlite_query_repository import SqliteQueryRepository
from service.concrete_path_resolver_service import ConcretePathResolverService
from service.image.concrete_image_request_converter_service import ConcreteImageRequestConverterService
from service.image.concrete_image_controller_service import ConcreteImageControllerService
from service.image.image_controller_service import ImageControllerService
from service.image.list_virtual_tag_database_converter_service import ListVirtualTagDatabaseConverterService
from service.image.sqlite_image_database_converter_service import SqliteImageDatabaseConverterService
from service.query.query_controller_service import QueryControllerService
from service.query.concrete_query_controller_service import ConcreteQueryControllerService
from service.query.concrete_query_converter_service import ConcreteQueryConverterService


class ConcreteControllerServiceFactory(ControllerServiceFactory):
    def get_image_service(self) -> ImageControllerService:
        image_database_converter = SqliteImageDatabaseConverterService()
        virtual_tag_database_converter = ListVirtualTagDatabaseConverterService()
        image_repository = SqliteAndListImageRepository(image_database_converter, virtual_tag_database_converter)

        image_request_converter = ConcreteImageRequestConverterService()
        path_resolver = ConcretePathResolverService()
        image_service = ConcreteImageControllerService(image_repository, image_request_converter, path_resolver)

        return image_service

    def get_query_service(self) -> QueryControllerService:
        query_repository = SqliteQueryRepository()
        query_converter = ConcreteQueryConverterService()
        
        query_service = ConcreteQueryControllerService(query_repository, query_converter)

        return query_service
