from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from enums.enums import GameStatus
from models.activity import Activity
from models.player import Player


class GameRoom(BaseModel):
    id: str
    players: List[Player]
    game_state: GameStatus = GameStatus.WAITING
    current_turn: Optional[str] = None
    game_over: bool = False
    winner: Optional[str] = None
    solution: Dict[str, Optional[str]] = Field(
        default_factory=lambda: {
            "room": None,
            "weapon": None,
            "character": None,
        }
    )
    activities: List[Activity] = Field(default_factory=list)

    @classmethod
    def create(
        cls, room_id: str, player_list: List[Player], activities: List[Activity]
    ) -> "GameRoom":
        return cls(
            id=room_id,
            players=player_list,
            activities=activities,
        )
