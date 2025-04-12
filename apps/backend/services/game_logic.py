import random
from typing import Dict, List, Tuple, Any

from models.activity import Activity
from models.game_room import GameRoom
from models.player import Player


def setup_game(
    cards: List[Dict], players: List["Player"], config: Any
) -> Tuple[Dict[str, Dict], Dict[str, List[Dict]]]:
    solution = {"suspect": None, "weapon": None, "room": None}

    grouped = {"suspect": [], "weapon": [], "room": []}
    for card in cards:
        if card["type"] in grouped:
            grouped[card["type"]].append(card)

    solution["suspect"] = random.choice(grouped["suspect"])
    solution["weapon"] = random.choice(grouped["weapon"])
    solution["room"] = random.choice(grouped["room"])

    picked_cards_ids = {
        solution["suspect"]["id"],
        solution["weapon"]["id"],
        solution["room"]["id"],
    }

    remaining_cards = [card for card in cards if card["id"] not in picked_cards_ids]
    random.shuffle(remaining_cards)

    available_characters = config.get("characters", [])
    random.shuffle(available_characters)

    for player, character in zip(players, available_characters):
        player.character = character
        player.current_location = character.get("startingPosition")
        player.cards = []

    for i, card in enumerate(remaining_cards):
        player = players[i % len(players)]
        player.cards.append(card)

    return solution, players


def find_current_player(room: GameRoom, player_id: str) -> Player:
    return next(
        (p for p in room.players if p.id == player_id or p.name == player_id), None
    )


def next_player_turn(room: GameRoom):
    current_player_index = room.players.index(
        next(p for p in room.players if p.name == room.current_turn)
    )
    next_player_index = (current_player_index + 1) % len(room.players)
    room.current_turn = room.players[next_player_index].name

    return room


def player_movement(
    room: GameRoom, player_name: str, character_name: str, target_location: str
):

    # Todo Should user player_id instead of player_name
    current_player = find_current_player(room, player_name)

    current_location_label = current_player.current_location
    target_location_label = target_location

    # Update location
    current_player.current_location = target_location

    # Update turn
    next_player_turn(room)

    # Append activity
    room.game_activities.append(
        Activity(
            player_name=current_player.name,
            message=f"{character_name} moved from {current_location_label} to {target_location_label}",
        )
    )

    return room
