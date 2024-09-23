import logging
from ...ws_connection import ConnectionManager, manager

async def broadcast_trade_execution_to_websockets(instrument_group: str, instrument: str, amount: int, manager: ConnectionManager = manager):
    try:
        logging.info("Received test limit update")
        data = {"instrument": instrument, "amount": amount}
        await manager.broadcast(data, instrument_group)
        return 200
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return 500