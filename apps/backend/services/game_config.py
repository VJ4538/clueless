from typing import Dict, Any


def generate_connection_map(gameboard, width: int):
    connection_map = {}
    height = len(gameboard) // width

    def get_tile(r, c):
        if 0 <= r < height and 0 <= c < width:
            return gameboard[r * width + c]
        return None

    for r in range(height):
        for c in range(width):
            tile = get_tile(r, c)
            if tile is None or tile["type"] == "empty":
                continue

            tile_id = tile["id"]
            adjacent_ids = []

            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                neighbor = get_tile(r + dr, c + dc)
                if neighbor and neighbor["type"] != "empty":
                    adjacent_ids.append(neighbor["id"])

            connection_map[tile_id] = {"adjacent": adjacent_ids}

            if "secretPassageTo" in tile:
                connection_map[tile_id]["secretPassage"] = tile["secretPassageTo"]

    return connection_map


def get_game_config() -> Dict[str, Any]:

    cards = [
        # Suspect cards
        {"id": "card-1", "type": "suspect", "name": "Miss Scarlet"},
        {"id": "card-2", "type": "suspect", "name": "Colonel Mustard"},
        {"id": "card-3", "type": "suspect", "name": "Mrs. White"},
        {"id": "card-4", "type": "suspect", "name": "Mr. Green"},
        {"id": "card-5", "type": "suspect", "name": "Mrs. Peacock"},
        {"id": "card-6", "type": "suspect", "name": "Professor Plum"},
        # Weapon cards
        {"id": "card-7", "type": "weapon", "name": "Candlestick"},
        {"id": "card-8", "type": "weapon", "name": "Dagger"},
        {"id": "card-9", "type": "weapon", "name": "Lead Pipe"},
        {"id": "card-10", "type": "weapon", "name": "Revolver"},
        {"id": "card-11", "type": "weapon", "name": "Rope"},
        {"id": "card-12", "type": "weapon", "name": "Wrench"},
        # Room cards
        {"id": "card-13", "type": "room", "name": "Study"},
        {"id": "card-14", "type": "room", "name": "Hall"},
        {"id": "card-15", "type": "room", "name": "Lounge"},
        {"id": "card-16", "type": "room", "name": "Library"},
        {"id": "card-17", "type": "room", "name": "Billiard Room"},
        {"id": "card-18", "type": "room", "name": "Dining Room"},
        {"id": "card-19", "type": "room", "name": "Conservatory"},
        {"id": "card-20", "type": "room", "name": "Ballroom"},
        {"id": "card-21", "type": "room", "name": "Kitchen"},
    ]

    characters = [
        {
            "id": "char-1",
            "name": "Miss Scarlet",
            "color": "Red",
            "startingPosition": "entry-1",
        },
        {
            "id": "char-2",
            "name": "Colonel Mustard",
            "color": "Yellow",
            "startingPosition": "entry-2",
        },
        {
            "id": "char-3",
            "name": "Mrs. White",
            "color": "White",
            "startingPosition": "entry-3",
        },
        {
            "id": "char-4",
            "name": "Mr. Green",
            "color": "Green",
            "startingPosition": "entry-4",
        },
        {
            "id": "char-5",
            "name": "Mrs. Peacock",
            "color": "Blue",
            "startingPosition": "entry-5",
        },
        {
            "id": "char-6",
            "name": "Professor Plum",
            "color": "Purple",
            "startingPosition": "entry-6",
        },
    ]

    board_raw = [
        # Row 1
        {"id": "empty-1", "type": "empty"},
        {"id": "empty-2", "type": "empty"},
        {"id": "entry-1", "type": "entry"},
        {"id": "empty-3", "type": "empty"},
        {"id": "entry-2", "type": "entry"},
        {"id": "empty-4", "type": "empty"},
        {"id": "empty-5", "type": "empty"},
        # Row 2
        {"id": "empty-6", "type": "empty"},
        {
            "id": "Study",
            "type": "room",
            "label": "Study",
            "secretPassageTo": "kitchen",
        },
        {"id": "hallway-1", "type": "hallway", "label": "Hallway 1"},
        {"id": "Hall", "type": "room", "label": "Hall"},
        {"id": "hallway-2", "type": "hallway", "label": "Hallway 2"},
        {
            "id": "Lounge",
            "type": "room",
            "label": "Lounge",
            "secretPassageTo": "conservatory",
        },
        {"id": "empty-7", "type": "empty"},
        # Row 3
        {"id": "entry-3", "type": "entry"},
        {"id": "hallway-3", "type": "hallway", "label": "Hallway 3"},
        {"id": "empty-8", "type": "empty"},
        {"id": "hallway-4", "type": "hallway", "label": "Hallway 4"},
        {"id": "empty-9", "type": "empty"},
        {"id": "hallway-5", "type": "hallway", "label": "Hallway 5"},
        {"id": "entry-4", "type": "entry"},
        # Row 4
        {"id": "empty-10", "type": "empty"},
        {"id": "Library", "type": "room", "label": "Library"},
        {"id": "hallway-6", "type": "hallway", "label": "Hallway 6"},
        {"id": "Billiard Room", "type": "room", "label": "Billiard Room"},
        {"id": "hallway-7", "type": "hallway", "label": "Hallway 7"},
        {"id": "Dining Room", "type": "room", "label": "Dining Room"},
        {"id": "empty-11", "type": "empty"},
        # Row 5
        {"id": "entry-5", "type": "entry"},
        {"id": "hallway-8", "type": "hallway", "label": "Hallway 8"},
        {"id": "empty-12", "type": "empty"},
        {"id": "hallway-9", "type": "hallway", "label": "Hallway 9"},
        {"id": "empty-13", "type": "empty"},
        {"id": "hallway-10", "type": "hallway", "label": "Hallway 10"},
        {"id": "entry-6", "type": "entry"},
        # Row 6
        {"id": "empty-14", "type": "empty"},
        {
            "id": "Conservatory",
            "type": "room",
            "label": "Conservatory",
            "secretPassageTo": "lounge_room",
        },
        {"id": "hallway-11", "type": "hallway", "label": "Hallway 11"},
        {"id": "Ballroom", "type": "room", "label": "Ballroom"},
        {"id": "hallway-12", "type": "hallway", "label": "Hallway 12"},
        {
            "id": "Kitchen",
            "type": "room",
            "label": "Kitchen",
            "secretPassageTo": "study_room",
        },
        {"id": "empty-15", "type": "empty"},
        # Row 7
        {"id": "empty-16", "type": "empty"},
        {"id": "empty-17", "type": "empty"},
        {"id": "entry-7", "type": "entry"},
        {"id": "empty-19", "type": "empty"},
        {"id": "entry-8", "type": "entry"},
        {"id": "empty-21", "type": "empty"},
        {"id": "empty-22", "type": "empty"},
    ]

    weapons = [
        {"id": "weapon-1", "name": "Candlestick"},
        {"id": "weapon-2", "name": "Dagger"},
        {"id": "weapon-3", "name": "Lead Pipe"},
        {"id": "weapon-4", "name": "Revolver"},
        {"id": "weapon-5", "name": "Rope"},
        {"id": "weapon-6", "name": "Wrench"},
    ]

    return {
        "cards": cards,
        "connections": generate_connection_map(board_raw, 7),
        "characters": characters,
        "gameboard": board_raw,
        "gameboard_size": 7,
        "weapons": weapons,
    }
