from fastapi import APIRouter
from typing import Dict, Any

from ...commons.error_handling.http_error import HttpError


example_routes = APIRouter(prefix="/example")


@example_routes.get("/{id}", tags=["example"])
async def get_example(user_id: str):
    return "Hello " + user_id


@example_routes.get("/", tags=["example"])
async def get_all_example():
    return "Hello all"


@example_routes.get("/error", tags=["example"])
async def error():
    raise HttpError(status_code=400, message="This is an error")
