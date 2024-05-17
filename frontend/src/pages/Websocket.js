import React, { useState, useEffect, useRef } from "react";
import { getdata } from "../model/wirelessIP";

function Websocket() {
  const [clientId, setClienId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const [ip, setip] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [websckt, setWebsckt] = useState();

  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getdata()
    .then((response) => {
      if (response) {
        setip(response.data);
      }
    })
    .catch(error => {
      console.log(error);
      // window.makeAlert('error', 'Error', error);
  });
  }, [ip]);

  useEffect(() => {
    const url = `ws://${ip}:8000/ws/` + clientId;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
      setIsOnline(true);
    };

    // recieve message every start page
    // ws.onmessage = (e) => {
    //   const receivedMessage = JSON.parse(e.data);
    //   setMessages([...messages, receivedMessage]);
    // };

    ws.onmessage = (e) => {
      const receivedMessage = JSON.parse(e.data);
      setMessages(prevMessages => [...prevMessages, receivedMessage])
    };

    setWebsckt(ws);
    //clean up function when we close page
    return () => ws.close();
  }, [ip, clientId]);

  const sendMessage = () => {
    websckt.send(message);
    // recieve message every send message
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };
    setMessage([]);
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