from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...database import get_db
from ..domain.db_test_domain import get_users

router = APIRouter()

@router.get("/users/{user_id}")
def read_users(user_id: int, db: Session = Depends(get_db)):
    user = get_users(db, user_id=user_id)
    if user:
        return {"user": user}
    else:
        return {"message": "User not found"}