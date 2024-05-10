from typing import List
from fastapi import WebSocket
from asyncio import Lock


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.lock = Lock()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        async with self.lock:
            self.active_connections.append(websocket)

    async def disconnect(self, websocket: WebSocket):
        async with self.lock:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except Exception as e:
            print(f"Error sending message to {websocket}: {e}")

    async def broadcast(self, message: str):
        async with self.lock:
            for connection in self.active_connections:
                try:
                    await connection.send_text(message)
                except Exception as e:
                    print(f"Error sending message to {connection}: {e}")