from abc import ABC, abstractmethod

import flask


class IController(ABC):
    @abstractmethod
    def initialize(self) -> flask.Blueprint: ...
