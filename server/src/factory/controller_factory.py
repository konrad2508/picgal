from controller.i_controller import IController
from factory.controller_service_factory import ControllerServiceFactory
from factory.i_controller_factory import IControllerFactory
from controller.image_controller import ImageController
from controller.query_controller import QueryController


class ControllerFactory(IControllerFactory):
    def __init__(self, config) -> None:
        self.config = config

    def get_controllers(self) -> list[IController]:
        controller_service_factory = ControllerServiceFactory()
        controllers = [
            ImageController(controller_service_factory, self.config.ROUTE_PREFIX),
            QueryController(controller_service_factory, self.config.ROUTE_PREFIX)
        ]

        return controllers
