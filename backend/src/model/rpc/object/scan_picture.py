from dataclasses import dataclass

import imagehash


@dataclass
class ScanPicture:
    path: str
    avg_hash: imagehash.ImageHash
    p_hash: imagehash.ImageHash
    d_hash: imagehash.ImageHash
    w_hash: imagehash.ImageHash
