import React, { useState, useEffect, useRef } from "react";
import { getdata } from "../model/wirelessIP";

function Websocket() {
    const [clientId, setClientId] = useState(
        Math.floor(new Date().getTime() / 1000)
    );

    const [isConnected, setIsConnected] = useState(false);
    const webscktRef = useRef(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [ip, setip] = useState(0);

    useEffect(() => {
        getdata()
        .then(response => {
            if (response) {
                setip(response.data)

            }
        })
        .catch(error => {
            console.log(error);
            // window.makeAlert('error', 'Error', error);
        });
    },[ip]);

    useEffect(() => {
        const url = `ws://${ip}:8000/ws/` + clientId;
        const ws = new WebSocket(url);

        ws.onopen = (event) => {
        if (!isConnected) {
            ws.send("Connect");
            setIsConnected(true);
        }
        };

        ws.onmessage = (e) => {
            const receivedMessage = JSON.parse(e.data);
            setMessages(prevMessages => [...prevMessages, receivedMessage])
            if (messages.current) {
                messages.current.scrollIntoView({ behavior: "smooth" });
            }
        };

        webscktRef.current = ws;

        return () => {
        if (webscktRef.current) {
            webscktRef.current.close();
        }
        }

    }, [clientId, isConnected, ip]);

    const sendMessage = () => {
        if (!message.trim()) return; // Nếu tin nhắn rỗng thì không gửi
        webscktRef.current.send(message); // Gửi tin nhắn qua WebSocket
        setMessage(""); // Xóa nội dung tin nhắn sau khi gửi
        console.log(ip);
    };

    return (
    <div className="container">
      <h1>Chat</h1>
      <h2>Your client id: {clientId} </h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => (
          <div key={index} className={value.clientId === clientId ? "my-message-container" : "another-message-container"}>
            <div className={value.clientId === clientId ? "my-message" : "another-message"}>
              <p className="client">client id : {value.clientId}</p>
              <p className="message">{value.message}</p>
            </div>
          </div>
          ))}
        </div>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button className="submit-chat" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Websocket;