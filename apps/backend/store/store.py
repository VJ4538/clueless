from typing import Dict, List
from models.game_room import GameRoom
from fastapi import WebSocket


# Mock DB

active_game_rooms: Dict[str, GameRoom] = {}
connections_by_room: Dict[str, List[WebSocket]] = {}

# Mock Data
# {
#     "id": "AD1AFCF7",
#     "players": [
#         {
#             "id": "7b28bb3d-9009-490f-89c2-b101640d23f6",
#             "name": "Player 1",
#             "character": null,
#             "is_owner": true,
#             "current_location": null,
#             "has_moved": false,
#             "cards": []
#         },
#         {
#             "id": "9b126728-8bae-42bb-bd71-c31a356b1e13",
#             "name": "Player 2",
#             "character": null,
#             "is_owner": false,
#             "current_location": null,
#             "has_moved": false,
#             "cards": []
#         }
#     ],
#     "game_state": "waiting",
#     "current_turn": null,
#     "game_over": false,
#     "winner": null,
#     "solution": {
#         "room": null,
#         "weapon": null,
#         "character": null
#     },
#     "activities": [
#         {
#             "id": "f0836659-7948-498d-b2a4-6b9c4020832d",
#             "player_name": "Player 1",
#             "message": "joined the game",
#             "timestamp": "2025-04-03T04:34:44.537900"
#         },
#         {
#             "id": "4d78cabb-1ac9-41a3-b922-48ac72e09f97",
#             "player_name": "Player 2",
#             "message": "joined the game",
#             "timestamp": "2025-04-03T04:34:48.585588"
#         }
#     ]
# }
