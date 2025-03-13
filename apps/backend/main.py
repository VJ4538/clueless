from typing import Union
from fastapi import FastAPI, Query, APIRouter
from modules.testAPI import modules_router

app = FastAPI()

# Include the router in the main app
app.include_router(modules_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
