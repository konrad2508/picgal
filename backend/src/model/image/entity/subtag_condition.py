from typing import Callable

from peewee import Expression


class SubtagCondition:
    def __init__(self, condition: Callable[[], Expression]) -> None:
        self.condition = condition

    def __call__(self) -> Expression:
        return self.condition()
