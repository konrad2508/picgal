from abc import ABC, abstractmethod

from model.image.enum.view_encrypted import ViewEncrypted
from model.rpc.data.authenticate_result import AuthenticateResult
from model.rpc.data.scan_result import ScanResult
from model.rpc.data.sync_database_result import SyncDatabaseResult
from model.rpc.data.config_data import ConfigData
from model.rpc.request.config_request import ConfigRequest
from model.rpc.request.scan_request import ScanRequest


class IRPCControllerService(ABC):
    @abstractmethod
    def sync_database(self) -> SyncDatabaseResult: ...

    @abstractmethod
    def get_config(self) -> ConfigData: ...

    @abstractmethod
    def modify_config(self, modifications: ConfigRequest) -> ConfigData: ...

    @abstractmethod
    def scan_directory_for_duplicates(self, scan_request: ScanRequest, view_encrypted: ViewEncrypted) -> ScanResult: ...

    @abstractmethod
    def authenticate(self) -> AuthenticateResult: ...

