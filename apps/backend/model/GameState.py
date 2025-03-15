from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Define the structure of your game state object
class GameState(BaseModel):
    current_turn: str
    players: List[str]
    rooms: List[str]
    suggestions: List[str]

# Example game state
current_game_state = {
    "current_turn": "Player 1",
    "players": ["Player 1", "Player 2", "Player 3"],
    "rooms": ["Living Room", "Kitchen", "Ballroom"],
    "suggestions": ["Player 1 suggested: Colonel Mustard in the Library with the Revolver"],
}

@router.get("/game/state", response_model=GameState)
async def get_game_state():
    return current_game_state
