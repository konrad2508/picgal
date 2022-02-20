from __future__ import annotations

from model.image.entity.subtag_condition import SubtagCondition


class VirtualTag:
    def __init__(self, name: str) -> None:
        self.name = name
        self.subtags: list[VirtualTag.Subtag] = []

    def add_subtag(self, subtag_name: str, subtag_condition: SubtagCondition) -> VirtualTag:
        self.subtags.append(VirtualTag.Subtag(subtag_name, subtag_condition))

        return self

    class Subtag:
        def __init__(self, name: str, condition: SubtagCondition) -> None:
            self.name = name
            self.condition = condition
