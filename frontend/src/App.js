import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [clientId, setClientId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const [isConnected, setIsConnected] = useState(false);
  const webscktRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + clientId;
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
    };

    webscktRef.current = ws;

    return () => {
      if (webscktRef.current) {
        webscktRef.current.close();
      }
    }

  }, [clientId, isConnected]);

  const sendMessage = () => {
    if (!message.trim()) return; // Nếu tin nhắn rỗng thì không gửi
    webscktRef.current.send(message); // Gửi tin nhắn qua WebSocket
    setMessage(""); // Xóa nội dung tin nhắn sau khi gửi
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

export default App;