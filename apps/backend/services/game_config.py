from typing import Dict, Any


def generate_connection_map(board_raw):
    connection_map = {}
    rows = len(board_raw)
    cols = len(board_raw[0])

    for r in range(rows):
        for c in range(cols):
            tile = board_raw[r][c]
            tile_id = tile["id"]

            if tile["type"] == "empty":
                continue

            adjacent_ids = []
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    neighbor = board_raw[nr][nc]
                    if neighbor["type"] != "empty":
                        adjacent_ids.append(neighbor["id"])

            connection_map[tile_id] = {"adjacent": adjacent_ids}

            if "secretPassageTo" in tile:
                connection_map[tile_id]["secretPassage"] = tile["secretPassageTo"]

    return connection_map


def get_game_config() -> Dict[str, Any]:
    characters = [
        {
            "id": "char-1",
            "name": "Miss Scarlet",
            "color": "Red",
            "startingPosition": "hallway-5",
        },
        {
            "id": "char-2",
            "name": "Colonel Mustard",
            "color": "Yellow",
            "startingPosition": "hallway-10",
        },
        {
            "id": "char-3",
            "name": "Mrs. White",
            "color": "White",
            "startingPosition": "hallway-12",
        },
        {
            "id": "char-4",
            "name": "Mr. Green",
            "color": "Green",
            "startingPosition": "hallway-9",
        },
        {
            "id": "char-5",
            "name": "Mrs. Peacock",
            "color": "Blue",
            "startingPosition": "hallway-4",
        },
        {
            "id": "char-6",
            "name": "Professor Plum",
            "color": "Purple",
            "startingPosition": "hallway-1",
        },
    ]

    board_raw = [
        # Row 1
        [
            {
                "id": "room-1",
                "type": "room",
                "label": "Study",
                "secretPassageTo": "room-9",  # Kitchen
            },
            {"id": "hallway-1", "type": "hallway", "label": "Hallway 1"},
            {"id": "room-2", "type": "room", "label": "Hall"},
            {"id": "hallway-2", "type": "hallway", "label": "Hallway 2"},
            {
                "id": "room-3",
                "type": "room",
                "label": "Lounge",
                "secretPassageTo": "room-7",  # Conservatory
            },
        ],
        # Row 2
        [
            {"id": "hallway-3", "type": "hallway", "label": "Hallway 4"},
            {"id": "empty-1", "type": "empty"},
            {"id": "hallway-4", "type": "hallway", "label": "Hallway 5"},
            {"id": "empty-2", "type": "empty"},
            {"id": "hallway-5", "type": "hallway", "label": "Hallway 6"},
        ],
        # Row 3
        [
            {"id": "room-4", "type": "room", "label": "Library"},
            {"id": "hallway-6", "type": "hallway", "label": "Hallway 6"},
            {"id": "room-5", "type": "room", "label": "Billiard Room"},
            {"id": "hallway-7", "type": "hallway", "label": "Hallway 7"},
            {"id": "room-6", "type": "room", "label": "Dining Room"},
        ],
        # Row 4
        [
            {"id": "hallway-8", "type": "hallway", "label": "Hallway 8"},
            {"id": "empty-3", "type": "empty"},
            {"id": "hallway-9", "type": "hallway", "label": "Hallway 9"},
            {"id": "empty-4", "type": "empty"},
            {"id": "hallway-10", "type": "hallway", "label": "Hallway 10"},
        ],
        # Row 5
        [
            {
                "id": "room-7",
                "type": "room",
                "label": "Conservatory",
                "secretPassageTo": "room-3",  # Lounge
            },
            {"id": "hallway-11", "type": "hallway", "label": "Hallway 11"},
            {"id": "room-8", "type": "room", "label": "Ballroom"},
            {"id": "hallway-12", "type": "hallway", "label": "Hallway 12"},
            {
                "id": "room-9",
                "type": "room",
                "label": "Kitchen",
                "secretPassageTo": "room-1",  # Study
            },
        ],
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
        "connections": generate_connection_map(board_raw),
        "characters": characters,
        "gameboard": board_raw,
        "weapons": weapons,
    }
