from typing import Optional
from pydantic import BaseModel

class ApprovalRequest(BaseModel):
    instrument_group: Optional[str] = None
    instrument: Optional[str] = None
    department: Optional[str] = None
    risk_country: Optional[str] = None
    exchange: Optional[str] = None
    trade_ccy: Optional[str] = None
    settlement_ccy: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "instrument_group": "JamesBond",
                    "instrument": "TexasInstrument",
                    "department": "DEMO",
                    "risk_country": "SINGAPORE",
                    "exchange": "SGX",
                    "trade_ccy": "SGD",
                    "settlement_ccy": "SGD"
                }
            ]
        }
    }

class TradeLimit(BaseModel):
    instrument_group: Optional[str] = None
    counterparty: Optional[str] = None
    currency: Optional[str] = None
    available_limit: Optional[int] = None
    data_date: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "instrument_group": "JamesBond",
                    "counterparty": "Apple",
                    "exchange": "SGX",
                    "currency": "SGD",
                    "available_limit": "SGD",
                    "data_date": "9/5/2024"
                }
            ]
        }
    }
class LimitTestBody(BaseModel):
    instrument_group: str
    instrument: str
    amount: int