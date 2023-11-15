from abc import ABC, abstractmethod

from controller.i_controller import IController


class IControllerFactory(ABC):
    @abstractmethod
    def get_controllers(self) -> list[IController]: ...
