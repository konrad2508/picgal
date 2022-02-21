from peewee import SqliteDatabase

from config import Config
from controller.i_controller import IController
from factory.partial_controller_factory import PartialControllerFactory
from factory.sqlite_controller_service_factory import SqliteControllerServiceFactory


class SqliteControllerFactory(PartialControllerFactory):
    def __init__(self, db: SqliteDatabase, cfg: Config) -> None:
        self.db = db
        self.cfg = cfg

    def get_controllers(self) -> list[IController]:
        controller_service_factory = SqliteControllerServiceFactory(self.db, self.cfg)
        controllers = self.instantiate_controllers(controller_service_factory, self.cfg)

        return controllers
