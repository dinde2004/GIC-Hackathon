from ..data_access.crud import get_user
from sqlalchemy.orm import Session

def get_users(db: Session, user_id: int):
    # Call the get_users_data_access function here
    users = get_user(db, user_id=user_id)
    
    return users