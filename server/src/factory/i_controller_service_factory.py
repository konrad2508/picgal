from abc import ABC, abstractmethod

from service.image.i_image_controller_service import IImageControllerService
from service.query.i_query_controller_service import IQueryControllerService
from service.rpc.i_rpc_controller_service import IRPCControllerService


class IControllerServiceFactory(ABC):
    @abstractmethod
    def get_image_service(self) -> IImageControllerService: ...

    @abstractmethod
    def get_query_service(self) -> IQueryControllerService: ...

    @abstractmethod
    def get_rpc_service(self) -> IRPCControllerService: ...
