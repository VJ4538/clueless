from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
from models.activity import Activity
from services.game_logic import player_movement, setup_game
from store.store import active_game_rooms, connections_by_room
from helpers.helpers import get_room_data, remove_player_from_room
from enums.enums import GameStatus

router = APIRouter()


async def connect_websocket(room_id: str, websocket: WebSocket):
    await websocket.accept()
    connections_by_room.setdefault(room_id, []).append(websocket)


def disconnect_websocket(room_id: str, websocket: WebSocket):
    connections_by_room.get(room_id, []).remove(websocket)


async def broadcast_to_room(room_id: str, message: dict):
    connections = connections_by_room.get(room_id, [])
    for conn in connections:
        await conn.send_text(json.dumps(message))


@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    if room_id not in active_game_rooms:
        return {"error": "Room not found"}

    await connect_websocket(room_id, websocket)

    try:
        while True:
            raw_data = await websocket.receive_text()
            message = json.loads(raw_data)
            print(f"[{room_id}] Received from client: {raw_data}")

            action = message.get("action")
            room = get_room_data(room_id)

            if action == "REQUEST_ROOM_DATA":
                await broadcast_to_room(
                    room_id,
                    {
                        "type": "UPDATE_ROOM_DATA",
                        "payload": get_room_data(room_id).json(),
                    },
                )
            elif action == "QUIT_FROM_ROOM":
                player_id = message.get("player_id")
                is_removed = remove_player_from_room(room_id, player_id)

                if is_removed:
                    await broadcast_to_room(
                        room_id,
                        {
                            "type": "UPDATE_ROOM_DATA",
                            "payload": get_room_data(room_id).json(),
                        },
                    )

                    await websocket.send_text(
                        json.dumps(
                            {"type": "QUIT_FROM_ROOM_SUCCESS", "player_id": player_id}
                        )
                    )
            elif action == "START_GAME":

                print(f"Starting game for room {room}")

                solution, players = setup_game(
                    room.config.get("cards"), room.players, room.config
                )

                room.game_state = GameStatus.IN_PROGRESS
                room.solution = solution
                room.players = players
                room.current_turn = players[0].name

                await broadcast_to_room(
                    room_id,
                    {
                        "type": "UPDATE_ROOM_DATA",
                        "payload": room.json(),
                    },
                )
            elif action == "PLAYER_MOVE":
                player_name = message.get("player_id")
                character_name = message.get("character_name")
                target_location = message.get("target_location")

                player_movement(
                    room,
                    player_name=player_name,
                    character_name=character_name,
                    target_location=target_location,
                )

                await broadcast_to_room(
                    room_id,
                    {
                        "type": "UPDATE_ROOM_DATA",
                        "payload": room.json(),
                    },
                )

            # Optionally process messages here
    except WebSocketDisconnect:
        disconnect_websocket(room_id, websocket)
