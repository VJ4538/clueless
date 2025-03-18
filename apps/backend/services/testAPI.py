from fastapi import APIRouter
from loguru import logger
from model.GameState import GameState, Player
import uuid

router = APIRouter()

# Dictionary to store active game rooms and their states
active_game_rooms = {}

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

@router.get("/game/status")
def get_game_status(room_id: str = None):
    try:
        logger.info(f"Received request for Game State: {room_id}")
        return active_game_rooms[room_id]

    except Exception as e:
        logger.error(f"Error in get_room_status: {e}")
        return {"error": str(e)}

@router.post("/game/status/update")
def update_game_status(payload: dict = None):
    try:
        player_turn_dict = {
            'Player 1': 'Player 2',
            'Player 2': 'Player 1'
        }

        message = f"Player: {player_turn_dict[payload['player_id']]} with action: {payload['action_type']}"

        logger.info(f"Update game status for room: {payload['room_id']}. {message}")

        room = active_game_rooms[payload['room_id']]

        room['current_turn'] = payload['player_id']

        room['notifications'].append(message)

        active_game_rooms[payload['room_id']] = room

        print('Updated room', room)

        return {"message": "Game status updated", "response": room}
    except Exception as e:
        logger.error(f"Error in update_game_status: {e}")
        return {"error": str(e)}

@router.get("/room/status")
def get_room_status(room_id: str = None):
    try:
        logger.info(f"Get room status: {room_id}")
        return active_game_rooms[room_id]
    except Exception as e:
        logger.error(f"Error in get_room_status: {e}")
        return {"error": str(e)}

# Update to post
@router.get("/room/update")
def get_room_status(room_id: str = None):
    try:
        logger.info(f"Update room status: {room_id}")
        updated_room = active_game_rooms[room_id]
        updated_room['game_state'] = 'in_progress'

        if active_game_rooms[room_id]['game_state'] != 'in_progress':
            active_game_rooms[room_id] = updated_room
            logger.info(f"Game state updated to in_progress")

        return {"message": "Game state updated", "response": updated_room}
    except Exception as e:
        logger.error(f"Error in get_room_status: {e}")
        return {"error": str(e)}

@router.get("/room/join")
def join_game_room(room_id: str = None):
    try:
        logger.info(f"Received request to join game room: {room_id}")
        if room_id not in active_game_rooms:
            return {"error": "Room not found"}
        
        # Get the current room state
        room = active_game_rooms[room_id]
        
        # Add new player
        new_player = {
            "name": f"Player {len(room['players']) + 1}",
            "is_owner": False
        }
        room['players'].append(new_player)
        
        return room
    except Exception as e:
        logger.error(f"Error in join_game_room: {e}")
        return {"error": str(e)}

@router.post("/room/create")
def create_game_room():
    try:
        room_id = str(uuid.uuid4())[:8].upper()
        logger.info(f"Received request to create game room with id: {room_id}")

        new_room = {
            "id": room_id,
            "players": [{
                "name": "Player 1",
                "is_owner": True
            }],
            "game_state":"waiting",
            "current_turn": 'Player 1',
            "game_over": False,
            "winner": None,
            "notifications": []
        }
        
        # Initialize new game state for this room
        active_game_rooms[room_id] = new_room

        return {"message": "Game room created", "response": new_room}
    except Exception as e:
        logger.error(f"Error in create_game_room: {e}")
        return {"error": str(e)}