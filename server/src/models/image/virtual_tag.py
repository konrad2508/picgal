from __future__ import annotations
from typing import Callable

import peewee


class VirtualTag:
    def __init__(self, name: str) -> None:
        self.name = name
        self.subtags: list[VirtualTag.Subtag] = []

    def add_subtag(self, subtag_name: str, subtag_condition: Callable[[], peewee.Expression]) -> VirtualTag:
        self.subtags.append(VirtualTag.Subtag(subtag_name, subtag_condition))

        return self

    class Subtag:
        def __init__(self, name: str, condition: Callable[[], peewee.Expression]) -> None:
            self.name = name
            self.condition = condition
