from abc import ABC, abstractmethod

from model.rpc.data.sync_database_result import SyncDatabaseResult
from model.rpc.data.config_data import ConfigData
from model.rpc.request.config_request import ConfigRequest


class IRPCControllerService(ABC):
    @abstractmethod
    def sync_database(self) -> SyncDatabaseResult: ...

    @abstractmethod
    def get_config(self) -> ConfigData: ...

    @abstractmethod
    def modify_config(self, modifications: ConfigRequest) -> ConfigData: ...

