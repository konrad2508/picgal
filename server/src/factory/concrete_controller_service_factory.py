from factory.controller_service_factory import ControllerServiceFactory
from repository.image.list_virtual_tag_repository import ListVirtualTagRepository
from repository.image.sqlite_image_repository import SqliteImageRepository
from repository.query.sqlite_query_repository import SqliteQueryRepository
from service.query.query_controller_service import QueryControllerService
from service.image.image_controller_service import ImageControllerService
from service.query.concrete_query_controller_service import ConcreteQueryControllerService
from service.query.concrete_query_converter_service import ConcreteQueryConverterService
from service.image.concrete_image_controller_service import ConcreteImageControllerService
from service.image.concrete_image_converter_service import ConcreteImageConverterService
from service.concrete_path_resolver_service import ConcretePathResolverService


class ConcreteControllerServiceFactory(ControllerServiceFactory):
    def get_image_service(self) -> ImageControllerService:
        image_repository = SqliteImageRepository()
        virtual_tag_repository = ListVirtualTagRepository()
        image_converter = ConcreteImageConverterService()
        path_resolver = ConcretePathResolverService()

        image_service = ConcreteImageControllerService(image_repository, virtual_tag_repository, image_converter, path_resolver)

        return image_service

    def get_query_service(self) -> QueryControllerService:
        query_repository = SqliteQueryRepository()
        query_converter = ConcreteQueryConverterService()
        
        query_service = ConcreteQueryControllerService(query_repository, query_converter)

        return query_service
