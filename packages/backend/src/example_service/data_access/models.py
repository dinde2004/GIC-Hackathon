from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ...database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    persona = Column(String)
    department = Column(String)


class ApprovalRequest(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True)
    instrument_group = Column(String)
    instrument = Column(String)

    department = Column(String)
    risk_country = Column(String)
    exchange = Column(String)
    trade_ccy = Column(String)
    settlement_ccy = Column(String)

    is_approved = Column(Boolean)


class TradeLimit(Base):
    __tablename__ = "limits"

    id = Column(Integer, primary_key=True)
    instrument_group = Column(String)
    counterparty = Column(String)
    #datadate = Column(String)

    available_limit = Column(Integer)
    used_limit = Column(Integer)