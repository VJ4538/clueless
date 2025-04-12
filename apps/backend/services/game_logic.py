import random
from typing import Dict, List, Tuple

from models.player import Player


def setup_game(
    cards: List[Dict], players: List["Player"]
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

    for i, card in enumerate(remaining_cards):
        player = players[i % len(players)]
        player.cards.append(card)

    print(f"Solution: {solution}")
    print(f"Cards: {players}")

    return solution, players
