from typing import Union
from fastapi import FastAPI, Query, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from services.testAPI import router
from core.logger_init import init_logging
from loguru import logger

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
app.include_router(router, prefix="/api")


