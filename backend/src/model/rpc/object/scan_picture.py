from dataclasses import dataclass

import imagehash


@dataclass
class ScanPicture:
    path: str
    avg_hash: imagehash.ImageHash
    p_hash: imagehash.ImageHash
    d_hash: imagehash.ImageHash
    w_hash: imagehash.ImageHash

    def __hash__(self) -> int:
        return self.path.__hash__()

    def __eq__(self, other: object) -> bool:
        return self.path == other.path
