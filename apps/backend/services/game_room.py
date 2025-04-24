from typing import Any
from fastapi import APIRouter, Header
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

        if len(current_room.players) == 6:
            return {"message": "Room is full"}

        if current_room.game_state == GameStatus.FINISHED:
            return {"message": "Game Ended"}

        if current_room.game_state == GameStatus.IN_PROGRESS:
            return {"message": "Unable to Join"}

        # Add temp player
        temp_player = generate_temp_user(is_host=False)
        current_room.players.append(temp_player)

        # Update activities
        current_room.waiting_room_activities.insert(
            0,
            Activity(
                player_name=temp_player.name,
                message=PlayerActivity.JOIN,
            ),
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
        new_waiting_room_activity = [
            Activity(
                player_name=temp_user.name,
                message=PlayerActivity.JOIN,
            )
        ]

        new_game_room = GameRoom(
            id=room_id,
            players=player_list,
            waiting_room_activities=new_waiting_room_activity,
            activities=[],
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


@router.get("/status")
def check_if_room_exist(room_id: str, authorization: str = Header(...)):
    try:
        response = {"message": "Game room status checked", "is_valid_room": False}

        print("auth", authorization)

        user_id = authorization

        game_room = active_game_rooms.get(room_id)

        if not game_room:
            return response

        player_in_room = any(player.id == user_id for player in game_room.players)
        is_active = game_room.game_state != GameStatus.FINISHED

        response["is_valid_room"] = player_in_room & is_active

        return response

    except Exception as e:
        logger.error(f"Error in check room status: {e}")
        return {"error": str(e)}
