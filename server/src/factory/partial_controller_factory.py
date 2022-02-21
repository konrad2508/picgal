from config import Config
from controller.i_controller import IController
from controller.image_controller import ImageController
from controller.query_controller import QueryController
from factory.i_controller_factory import IControllerFactory
from factory.i_controller_service_factory import IControllerServiceFactory


class PartialControllerFactory(IControllerFactory):
    def instantiate_controllers(self, factory: IControllerServiceFactory, cfg: Config) -> list[IController]:
        controllers = [
            ImageController(factory, cfg.ROUTE_PREFIX),
            QueryController(factory, cfg.ROUTE_PREFIX)
        ]

        return controllers
