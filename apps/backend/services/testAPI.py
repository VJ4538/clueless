from fastapi import APIRouter
from loguru import logger

router = APIRouter()

@router.get("/formatMessage")
def test_call(payload: str = None):
    try:
        logger.info(f"Received payload: {payload}")
        return {"message": "Backend " + payload}
    except Exception as e:
        logger.error(f"Error in test_call: {e}")
        return {"error": str(e)}