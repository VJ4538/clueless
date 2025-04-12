from pydantic import BaseModel, Field
from typing import Dict, List, Optional
import uuid
import random


class Player(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    character: str = None
    is_host: bool = False
    current_location: str = None
    has_moved: bool = False
    cards: List[Dict] = Field(default_factory=list)

    @classmethod
    def create(cls, is_host: bool) -> "Player":
        random_id = str(random.randint(10_000_000, 99_999_999))
        return cls(
            name=f"Player_{random_id}",
            is_host=is_host,
        )
