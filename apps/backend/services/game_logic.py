import random
from typing import Dict, List, Tuple, Any

from enums.enums import GameStatus
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


def end_turn(room: GameRoom):
    current_player_index = 0
    elimiated_players = 0

    for p in room.players:
        p.has_accused = False
        p.has_moved = False
        p.has_suggested = False
        if p.name == room.current_turn:
            current_player_index = room.players.index(p)

    next_player_index = (current_player_index + 1) % len(room.players)

    # Skip eliminated players
    while room.players[next_player_index].is_eliminated:
        elimiated_players += 1
        next_player_index = (next_player_index + 1) % len(room.players)

        # Avoid infinite loop
        if elimiated_players == len(room.players):
            print("Debug: All players are eliminated")
            room.game_state = GameStatus.FINISHED
            room.winner = "All players are eliminated"
            room.game_activities.insert(
                0,
                Activity(
                    player_name="System",
                    message="All players are eliminated, game over.",
                ),
            )
            return room

    room.current_turn = room.players[next_player_index].name

    return room


def player_movement(
    room: GameRoom, player_name: str, character_name: str, target_location: str
):

    # Todo Should user player_id instead of player_name
    current_player = find_current_player(room, player_name)

    current_location_label = current_player.current_location
    target_location_label = target_location

    current_player.current_location = target_location
    current_player.has_moved = True

    # Append activity
    room.game_activities.insert(
        0,
        Activity(
            player_name=f"{character_name} ({player_name})",
            message=f" moved from {current_location_label} to {target_location_label}",
        ),
    )

    return room


def player_suggestion(
    room: GameRoom,
    player_name: str,
    suggested_character: str,
    suggested_room: str,
    suggested_weapon: str,
):

    current_player = find_current_player(room, player_name)

    current_player.has_suggested = True

    room.game_activities.insert(
        0,
        Activity(
            player_name=f"{current_player.character.get('name')} ({player_name})",
            message=f" suggested it was {suggested_character} with {suggested_weapon} in {suggested_room}",
        ),
    )

    # move suggested character into that room
    for player in room.players:
        if player.character.get("name") == suggested_character:
            player.current_location = suggested_room
            c_name = player.character.get("name")
            room.game_activities.insert(
                0,
                Activity(
                    player_name="SYSTEM",
                    message=f"moved {c_name} to {suggested_room} for suggestion",
                ),
            )

    for player in room.players:
        # Skip the current player
        if player.name == current_player.name:
            continue

        for card in player.cards:
            if (
                card.get("name") == suggested_character
                or card.get("name") == suggested_room
                or card.get("name") == suggested_weapon
            ):
                room.game_activities.insert(
                    0,
                    Activity(
                        player_name="",
                        message=f"A card has been revealed",
                    ),
                )
                room.revealved_cards.insert(0, card)
                return room
    # else no cards were revealed
    return room


def player_accusation(
    room: GameRoom,
    player_name: str,
    accused_character: str,
    accused_room: str,
    accused_weapon: str,
):

    current_player = find_current_player(room, player_name)
    player_character_name = current_player.character.get("name")

    formatted_player_name = f"{player_character_name} ({current_player.name})"

    if (
        room.solution["suspect"].get("name") == accused_character
        and room.solution["room"].get("name") == accused_room
        and room.solution["weapon"].get("name") == accused_weapon
    ):
        room.game_state = GameStatus.FINISHED
        room.winner = current_player.name

        room.game_activities.insert(
            0,
            Activity(
                player_name=formatted_player_name,
                message=f"made the correct accusation. It was {accused_character} with {accused_weapon} in {accused_room}.",
            ),
        )
        room.game_activities.insert(
            0,
            Activity(
                player_name="System",
                message=f"Winner is {player_character_name} ({player_name}) !!!",
            ),
        )
    else:
        current_player.is_eliminated = True
        room.game_activities.insert(
            0,
            Activity(
                player_name=formatted_player_name,
                message=f"made incorrect accusation and has been eliminated",
            ),
        )
        end_turn(room)

    return room
