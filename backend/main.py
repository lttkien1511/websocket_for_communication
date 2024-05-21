from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Controller import Websocket

app = FastAPI()

app.include_router(Websocket.router)

origins = [
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # can alter with time
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get():
    return "Welcome Home"

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host=wlan_ip(), port=8000)

