from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.logger_init import init_logging
from loguru import logger
from services.game_room import router as game_room_router
from services.web_socket_manager import router as ws_router

# Initialize logging
init_logging()

# App initialization
logger.info("Starting App...")

app = FastAPI(
    title="Clueless Backend Service",
    version="0.1",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    # Allow only localhost:3000 ( Our local frontend )
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router config
app.include_router(game_room_router, prefix="/api/room")
app.include_router(ws_router)
