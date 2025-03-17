from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from typing import Dict, List, Optional
from pydantic import BaseModel

#Import game logic and testAPI
from backend.services.game_logic import GameState, PlayerAction
from backend.services.testAPI import mock_game_state

app = FastAPI()

#Enable CORS (Cross-Origin Resource Sharing) for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#Initialize the game state
game_state = GameState()

#Pydantic model for player action input
class PlayerActionInput(BaseModel):
    player_id: str
    action: PlayerAction
    details: Dict

#Endpoint to add a player to the game
@app.post("/add_player")
async def add_player(player_id: str, character: str):
    try:
        logger.info(f"Adding player {player_id} as {character}")
        success = game_state.add_player(player_id, character)
        if success:
            return {"message": f"Player {player_id} added as {character}"}
        else:
            raise HTTPException(status_code=400, detail="Failed to add player")
    except Exception as e:
        logger.error(f"Error adding player: {e}")
        raise HTTPException(status_code=500, detail=str(e))

#Endpoint to handle player actions
@app.post("/player_action")
async def handle_player_action(action_input: PlayerActionInput):
    try:
        logger.info(f"Received action from player {action_input.player_id}: {action_input.action}")
        game_state.receive_player_action(action_input.player_id, action_input.action, action_input.details)
        return {"message": f"Action {action_input.action} processed for player {action_input.player_id}"}
    except Exception as e:
        logger.error(f"Error processing player action: {e}")
        raise HTTPException(status_code=500, detail=str(e))

#Endpoint to get the current game state (mock for now)
@app.get("/get_game_state")
async def get_game_state():
    try:
        logger.info("Fetching game state")
        #temporarily, return the mock game state from testAPI.py
        return mock_game_state
    except Exception as e:
        logger.error(f"Error fetching game state: {e}")
        raise HTTPException(status_code=500, detail=str(e))