from peewee import SqliteDatabase

from config import Config
from controller.i_controller import IController
from controller.image_controller import ImageController
from controller.query_controller import QueryController
from factory.sqlite_controller_service_factory import SqliteControllerServiceFactory
from factory.i_controller_factory import IControllerFactory


class SqliteControllerFactory(IControllerFactory):
    def __init__(self, db: SqliteDatabase, cfg: Config) -> None:
        self.db = db
        self.cfg = cfg

    def get_controllers(self) -> list[IController]:
        controller_service_factory = SqliteControllerServiceFactory(self.db, self.cfg)
        controllers = [
            ImageController(controller_service_factory, self.cfg.ROUTE_PREFIX),
            QueryController(controller_service_factory, self.cfg.ROUTE_PREFIX)
        ]

        return controllers
