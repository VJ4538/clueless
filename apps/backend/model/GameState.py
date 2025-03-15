from pydantic import BaseModel
from typing import List

class Player(BaseModel):
    name: str
    character: str
    current_room: str
    has_made_suggestion: bool

class GameState(BaseModel):
    current_turn: str
    players: List[Player]
    rooms: List[str]
    suggestions: List[str]