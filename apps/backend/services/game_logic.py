from typing import Dict, List, Optional
from fastapi import APIRouter
from enum import Enum
from loguru import logger


router = APIRouter()

class PlayerAction(str, Enum):
    MOVE = "move"
    SUGGESTION = "suggestion"
    ACCUSATION = "accusation"
    END_TURN = "end_turn"

# Game state
class GameState:
    def __init__(self):
        self.players: Dict[str, Dict] = {}  # Player info
        self.turn_order: List[str] = []     # Order of player turns
        self.current_turn: Optional[str] = None  # Tracks whose turn it is
        self.game_board = self.initialize_board()  # Game board setup
        self.case_file = self.initialize_case_file()  # Case file selection

    def initialize_board(self) -> Dict:
        """Game board setup."""
        logger.info("Initializing game board")
        return {
            "rooms": ["Study", "Hall", "Lounge", "Library", "Billiard Room", "Dining Room", "Conservatory", "Ballroom", "Kitchen"],
            "weapons": ["Knife", "Revolver", "Rope", "Lead Pipe", "Wrench", "Candlestick"],
            "characters": ["Miss Scarlet", "Col. Mustard", "Mrs. White", "Mr. Green", "Mrs. Peacock", "Prof. Plum"],
            "hallways": [("Study", "Hall"), ("Hall", "Lounge"), ("Study", "Library"), ("Hall", "Billiard Room"),
                          ("Lounge", "Dining Room"), ("Library", "Billiard Room"), ("Billiard Room", "Dining Room"),
                          ("Library", "Conservatory"), ("Billiard Room", "Ballroom"), ("Dining Room", "Kitchen")],
            "secret_passages": {"Study": "Kitchen", "Kitchen": "Study", "Lounge": "Conservatory", "Conservatory": "Lounge"}
        }
    
    def initialize_case_file(self) -> Dict:
        """Case file selection."""
        logger.info("Selecting case file mystery")
        return {
            "suspect": "Random Suspect",
            "weapon": "Random Weapon",
            "room": "Random Room"
        }

    def add_player(self, player_id: str, character: str):
        """Adding a player."""
        logger.info(f"Adding player {player_id} as {character}")
        return True

    def validate_action(self, player_id: str, action: PlayerAction, details: Dict) -> bool:
        """Action validation."""
        logger.info(f"Validating action {action} for player {player_id}")
        return True

    def send_game_state_update(self):
        """GAME_STATE_UPDATE to Networking Layer (Layer 4)."""
        logger.info("Sending GAME_STATE_UPDATE to Networking Layer")

    def send_error_message(self, player_id: str, message: str):
        """ERROR_MESSAGE to Networking Layer (Layer 4)."""
        logger.error(f"Sending ERROR_MESSAGE to Networking Layer: {player_id} - {message}")

    def receive_player_action(self, player_id: str, action: PlayerAction, details: Dict):
        """PLAYER_ACTION from Networking Layer (Layer 4)."""
        logger.info(f"Received PLAYER_ACTION from Networking Layer: {player_id} - {action}")
        self.validate_action(player_id, action, details)
