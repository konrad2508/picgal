from config import Config
from controller.i_controller import IController
from controller.image_controller import ImageController
from controller.query_controller import QueryController
from factory.controller_service_factory import ControllerServiceFactory
from factory.i_controller_factory import IControllerFactory


class ControllerFactory(IControllerFactory):
    def __init__(self, cfg: Config) -> None:
        self.cfg = cfg

    def get_controllers(self) -> list[IController]:
        controller_service_factory = ControllerServiceFactory(self.cfg)
        controllers = [
            ImageController(controller_service_factory, self.cfg.ROUTE_PREFIX),
            QueryController(controller_service_factory, self.cfg.ROUTE_PREFIX)
        ]

        return controllers
