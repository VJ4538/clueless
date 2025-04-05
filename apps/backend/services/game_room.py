from typing import Any
from fastapi import APIRouter
from loguru import logger
from models.game_room import GameRoom
from models.activity import Activity
from enums.enums import GameStatus, PlayerActivity
from helpers.helpers import generate_temp_user
from store.store import active_game_rooms
import uuid

router = APIRouter()


@router.post("/join")
def join_game_room(payload: dict):
    try:
        game_id = payload.get("game_id")
        logger.info(f"Received request to join game room: {game_id}")
        if game_id not in active_game_rooms:
            return {"error": "Room not found"}

        # Get the current room state
        current_room = active_game_rooms[game_id]

        if len(current_room.players) == 4:
            return {"message": "Room is full"}

        # Add temp player
        temp_player = generate_temp_user(is_host=False)
        current_room.players.append(temp_player)

        # Update activities
        current_room.activities.append(
            Activity(
                player_name=temp_player.name,
                message=PlayerActivity.JOIN,
            )
        )

        # Update room
        active_game_rooms[game_id] = current_room

        return {
            "room": current_room,
            "user": temp_player,
            "message": "Joined Room",
        }
    except Exception as e:
        logger.error(f"Error in join_game_room: {e}")
        return {"error": str(e)}


@router.post("/create")
def create_game_room():
    try:
        room_id = str(uuid.uuid4())[:8].upper()
        logger.info(f"Game room created with Id: {room_id}")

        temp_user = generate_temp_user(is_host=True)
        player_list = [temp_user]
        new_activity = [
            Activity(
                player_name=temp_user.name,
                message=PlayerActivity.JOIN,
            )
        ]

        new_game_room = GameRoom(
            id=room_id, players=player_list, activities=new_activity
        )

        # Initialize new game state for this room
        active_game_rooms[room_id] = new_game_room

        return {
            "message": "Game room created",
            "room": new_game_room,
            "user": temp_user,
            "debug_all_room": active_game_rooms,
        }
    except Exception as e:
        logger.error(f"Error in create_game_room: {e}")
        return {"error": str(e)}
