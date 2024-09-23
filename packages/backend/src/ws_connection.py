from fastapi import WebSocket
from collections import defaultdict
import json
import logging

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = defaultdict(list)

    async def connect(self, websocket: WebSocket, instrument_group: str):
        logging.info("Connecting to Websocket")
        await websocket.accept()
        self.active_connections[instrument_group].append(websocket)

    def disconnect(self, websocket: WebSocket, instrument_group: str):
        self.active_connections[instrument_group].remove(websocket)
        if not self.active_connections[instrument_group]:
            del self.active_connections[instrument_group]

    async def broadcast(self, data: dict, instrument_group: str):
        logging.info("Broadcasting message to all connected clients")
        if instrument_group in self.active_connections:
            for connection in self.active_connections[instrument_group]:
                await connection.send_text(json.dumps(data))
                
manager = ConnectionManager()