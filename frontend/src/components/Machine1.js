import React, { useState, useEffect } from "react";

function Machine1({ipAddress}) {
  const [websckt, setWebsckt] = useState(null);


  useEffect(() => {
    const url = `ws://192.168.0.100:8000/ws`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWebsckt(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (websckt && websckt.readyState === WebSocket.OPEN) {
      websckt.send('send');
    }
    else {
      console.error('WebSocket is not open.');
    }
  };

  return (
    <div className="container">
      <h1>Bạn đang chạy trên máy có địa chỉ IP là {ipAddress}</h1>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Machine1;