from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Request
from Helper.ConnectionManager import ConnectionManager
# from datetime import datetime
from Helper.Reply import Reply
# import json
# import subprocess
# import socket
from typing import List


router = APIRouter()
manager = ConnectionManager()

# def wlan_ip():
#     result=subprocess.run('ipconfig',stdout=subprocess.PIPE,text=True).stdout.lower()
#     scan=0
#     for i in result.split('\n'):
#         if 'wireless' in i: scan=1
#         if scan:
#             if 'ipv4' in i: 
#                 return i.split(':')[1].strip()
            
# def get_local_ip():
#     hostname = socket.gethostname()
#     local_ip = socket.gethostbyname(hostname)
#     return local_ip

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            if data == "send":
                await manager.broadcast("success")
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        # message = {"time":current_time,"clientId":client_id,"message":"Offline"}
        await manager.broadcast("Offline")

# @router.get("/wireless")
# async def getWirelessIP():
#     try:
#         return Reply.make(True, 'Success', wlan_ip())
#     except Exception as e:
#         return Reply.make(False, 'Failed', e)
    
@router.get("/ip")
async def read_ip(request: Request):
    try:
        client_host = request.client.host
        return Reply.make(True, 'Success', client_host)
    except Exception as e:
        return Reply.make(False, 'Failed', e)
    
            