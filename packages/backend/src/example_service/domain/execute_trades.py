import asyncio
from ..data_access.crud import retrieve_limit, update_limit
from sqlalchemy.orm import Session

account_lock = asyncio.Lock()

async def execute_trade(instrument_group: str, counterparty: str, amount: int, db: Session):
    async with account_lock:
        current_limit = retrieve_limit(db, instrument_group, counterparty)
        if current_limit is None:
            raise
        if current_limit < amount:
            return False
        else:
            current_limit -= amount
            update_limit(db, instrument_group, counterparty, current_limit)
            return True
