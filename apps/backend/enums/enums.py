from enum import Enum


class GameStatus(str, Enum):
    WAITING = "WAITING"
    FINISHED = "FINISHED"
    IN_PROGRESS = "IN_PROGRESS"


class PlayerActivity(str, Enum):
    JOIN = "joined the game"
    LEFT = "left the game"
