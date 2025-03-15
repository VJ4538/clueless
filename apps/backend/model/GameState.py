from pydantic import BaseModel
from typing import List, Optional

class Player(BaseModel):
    name: str
    character: str
    current_room: str
    has_made_suggestion: bool

class GameState(BaseModel):
    current_turn: str
    players: List[Player]
    current_turn: int
    game_over: bool
    winner: Optional[str] = None
