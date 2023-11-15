from __future__ import annotations
from dataclasses import dataclass
from typing import Optional


@dataclass
class ImageModificationRequest:
    characters_added: list[str]
    characters_removed: list[str]
    sources_added: list[str]
    sources_removed: list[str]
    general_added: list[str]
    general_removed: list[str]
    meta_added: list[str]
    meta_removed: list[str]
    toggle_favourite: bool
    ids: Optional[list[int]] = None

    @classmethod
    def from_json(cls, json: dict[str, list[str] | bool]) -> ImageModificationRequest:
        obj = cls(
            characters_added=json['characters_added'],
            characters_removed=json['characters_removed'],
            sources_added=json['sources_added'],
            sources_removed=json['sources_removed'],
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
