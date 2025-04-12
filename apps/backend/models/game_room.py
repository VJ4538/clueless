from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from enums.enums import GameStatus
from models.activity import Activity
from models.player import Player
from services.game_config import get_game_config


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
    waiting_room_activities: List[Activity] = Field(default_factory=list)
    game_activities: List[Activity] = Field(default_factory=list)
    config: Dict[str, Any] = Field(default_factory=get_game_config)

    @classmethod
    def create(
        cls,
        room_id: str,
        player_list: List[Player],
        waiting_room_activities: List[Activity],
        activities: List[Activity],
    ) -> "GameRoom":
        return cls(
            id=room_id,
            players=player_list,
            waiting_room_activities=waiting_room_activities,
            activities=activities,
        )
