from datetime import datetime
from pydantic import BaseModel, Field
import uuid


class Activity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_name: str
    message: str
    timeStamp: datetime = Field(default_factory=datetime.utcnow)
