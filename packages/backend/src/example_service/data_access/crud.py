from sqlalchemy.orm import Session

from . import models, schemas
from .. import schema


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


def get_instrument_group(db: Session):
    return db.query(models.ApprovalRequest.instrument_group).distinct().all()

def get_instrument(db: Session):
    return db.query(models.ApprovalRequest.instruments).distinct().all()

def get_department(db: Session):
    return db.query(models.ApprovalRequest.department).distinct().all()

def get_risk_country(db: Session):
    return db.query(models.ApprovalRequest.risk_country).distinct().all()

def get_exchange(db: Session):
    return db.query(models.ApprovalRequest.exchange).distinct().all()

def get_trade_ccy(db: Session):
    return db.query(models.ApprovalRequest.trade_ccy).distinct().all()

def get_settlement_ccy(db: Session):
    return db.query(models.ApprovalRequest.settlement_ccy).distinct().all()

def get_counterparty(db: Session):
    return db.query(models.ApprovalRequest.counterparty).distinct().all()

def get_app_requests(db: Session):
    return db.query(models.TradeLimit).distinct().all()

def get_trade_limit(db: Session, instrument_group: str):
    return db.query(
        models.TradeLimit.counterparty,
        (models.TradeLimit.available_limit - models.TradeLimit.used_limit).label('remaining_limit')
    ).filter(
        models.TradeLimit.instrument_group == instrument_group
    ).all()


def search_approvals(db: Session, query: schema.ApprovalRequest):
    query_params = query.model_dump(mode='json')
    nonempty_params = {key: value for (key, value) in query_params.items() if value}
    results = db.query(models.ApprovalRequest).filter_by(**nonempty_params).all()

    return results


def create_approval_request(db: Session, request: schema.ApprovalRequest):
    request_dict = request.model_dump(mode='json')
    request_dict["is_approved"] = False
    db_request = models.ApprovalRequest(**request_dict)
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return request_dict


def create_limit(db: Session, limit: schema.TradeLimit):
    limit_dict = limit.model_dump(mode='json')
    db_limit = models.TradeLimit(**limit_dict)
    db.add(db_limit)
    db.commit()
    db.refresh(db_limit)
    return limit_dict


def retrieve_limit(db: Session, instrument_group: str, counterparty: str):
    result = db.query(models.TradeLimit).filter(models.TradeLimit.instrument_group == instrument_group, 
                                              models.TradeLimit.counterparty == counterparty).first()
    if result == None: return None
    else:
        return result.available_limit

def update_limit(db: Session, instrument_group: str, counterparty: str, new_limit: float):
    # Query for the record
    record = db.query(models.TradeLimit).\
        filter(models.TradeLimit.instrument_group == instrument_group, 
               models.TradeLimit.counterparty == counterparty).first()

    if record is None:
        return None

    # Update the limit
    record.available_limit = new_limit
    db.commit()
    db.refresh(record)

    # Return the updated record
    return record


def exhaust_limit(db: Session, instrument_group: str, counterparty: str, amount: float):
    # Query for the record
    record = db.query(models.TradeLimit).\
        filter(models.TradeLimit.instrument_group == instrument_group, 
               models.TradeLimit.counterparty == counterparty).first()

    if record is None:
        return None

    # Decrease the limit
    record.used_limit += amount
    db.commit()
    db.refresh(record)

    # Return the updated record
    return record


# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item

