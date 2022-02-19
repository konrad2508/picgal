from abc import ABC, abstractmethod

from service.image.image_controller_service import ImageControllerService
from service.query.query_controller_service import QueryControllerService


class ControllerServiceFactory(ABC):
    @abstractmethod
    def get_image_service(self) -> ImageControllerService: ...

    @abstractmethod
    def get_query_service(self) -> QueryControllerService: ...
