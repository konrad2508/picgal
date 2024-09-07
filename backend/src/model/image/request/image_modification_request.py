from __future__ import annotations
from dataclasses import dataclass
from typing import Optional


@dataclass
class ImageModificationRequest:
    lowlevel_added: list[str]
    lowlevel_removed: list[str]
    highlevel_added: list[str]
    highlevel_removed: list[str]
    general_added: list[str]
    general_removed: list[str]
    meta_added: list[str]
    meta_removed: list[str]
    toggle_favourite: bool
    ids: Optional[list[int]] = None

    @classmethod
    def from_json(cls, json: dict[str, list[str] | bool]) -> ImageModificationRequest:
        obj = cls(
            lowlevel_added=json['lowlevel_added'],
            lowlevel_removed=json['lowlevel_removed'],
            highlevel_added=json['highlevel_added'],
            highlevel_removed=json['highlevel_removed'],
            general_added=json['general_added'],
            general_removed=json['general_removed'],
            meta_added=json['meta_added'],
            meta_removed=json['meta_removed'],
            toggle_favourite=json['toggle_favourite']
        )
        
        try:
            obj.ids = json['ids']
        
        finally:
            return obj
