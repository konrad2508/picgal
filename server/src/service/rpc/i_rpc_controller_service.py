from abc import ABC, abstractmethod

from model.rpc.data.sync_database_result import SyncDatabaseResult


class IRPCControllerService(ABC):
    @abstractmethod
    def sync_database(self) -> SyncDatabaseResult: ...
