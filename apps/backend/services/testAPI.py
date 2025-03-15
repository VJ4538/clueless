from fastapi import APIRouter
from loguru import logger
from model.GameState import GameState, Player

router = APIRouter()

@router.get("/formatMessage")
def test_call(payload: str = None):
    try:
        logger.info(f"Received payload: {payload}")
        return {"message": "Backend " + payload}
    except Exception as e:
        logger.error(f"Error in test_call: {e}")
        return {"error": str(e)}

mock_game_state = GameState(
    players=[
        Player(name="Player 1", character="Miss Scarlet", current_room="Study", has_made_suggestion=False),
        Player(name="Player 2", character="Professor Plum", current_room="Library", has_made_suggestion=True),
        Player(name="Player 3", character="Mrs. Peacock", current_room="Ballroom", has_made_suggestion=False),
    ],
    current_turn=1,
    game_over=False,
    winner=None,
)

@router.get("/getMockGameState")
def test_call(payload: str = None):
    try:
        logger.info(f"Received request for Game State: {payload}")
        return mock_game_state
    except Exception as e:
        logger.error(f"Error in get_game_state_call: {e}")
        return {"error": str(e)}