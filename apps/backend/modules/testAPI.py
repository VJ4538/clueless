# Create a router for modules
modules_router = APIRouter(prefix="/api/testing")

@modules_router.get("/test")
def test_call(payload: str = None):
    return {"message": "Backend " + payload}
