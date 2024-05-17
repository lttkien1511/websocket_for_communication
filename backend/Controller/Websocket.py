from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from Helper.ConnectionManager import ConnectionManager
from datetime import datetime
from Helper.Reply import Reply
import json
import subprocess

router = APIRouter()
manager = ConnectionManager()

def wlan_ip():
    result=subprocess.run('ipconfig',stdout=subprocess.PIPE,text=True).stdout.lower()
    scan=0
    for i in result.split('\n'):
        if 'wireless' in i: scan=1
        if scan:
            if 'ipv4' in i: 
                return i.split(':')[1].strip()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    try:
        while True:
            data = await websocket.receive_text()
            message = {"time":current_time,"clientId":client_id,"message":data}
            await manager.broadcast(json.dumps(message))
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        # message = {"time":current_time,"clientId":client_id,"message":"Offline"}
        await manager.broadcast(json.dumps(message))

@router.get("/wireless")
async def getWirelessIP():
    try:
        return Reply.make(True, 'Success', wlan_ip())
    except Exception as e:
        return Reply.make(False, 'Failed', e)
    
            