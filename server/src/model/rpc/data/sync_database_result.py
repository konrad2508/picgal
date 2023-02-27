from dataclasses import dataclass


@dataclass
class SyncDatabaseResult:
    deleted_counter: int
    restored_previews_counter: int
    restored_samples_counter: int
    add_counter: int
