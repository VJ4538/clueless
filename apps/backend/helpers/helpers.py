from enums.enums import PlayerActivity
from models.activity import Activity
from models.player import Player
from store.store import active_game_rooms


def generate_temp_user(is_host: bool = False) -> dict:

    return Player.create(is_host=(is_host))


def get_room_data(room_id: str):
    if room_id not in active_game_rooms:
        return None

    return active_game_rooms[room_id]


def remove_player_from_room(room_id: str, target_player_id: str) -> bool:
    room = get_room_data(room_id)
    if not room:
        return False

    target_player = next((p for p in room.players if p.id == target_player_id), None)
    if not target_player:
        return False

    is_host_quitting = target_player.is_host

    room.players = [p for p in room.players if p.id != target_player_id]

    if is_host_quitting:
        room.players[0].is_host = True

    room.waiting_room_activities.append(
        Activity(player_name=target_player.name, message=PlayerActivity.LEFT)
    )

    return True
