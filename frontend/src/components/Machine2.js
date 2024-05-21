import React, { useState, useEffect } from "react";
import { getdata } from "../model/wirelessIP";

function Machine2({ipAddress}) {
  const [websckt, setWebsckt] = useState(null);



  useEffect(() => {
    const url = `ws://192.168.0.100:8000/ws`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
        console.log('Message from server:', event.data);
        if (event.data === "success") {
          alert("Success");
        }
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


  return (
    <div className="container">
      <h1>Bạn đang chạy trên máy có địa chỉ IP là {ipAddress}</h1>
    </div>
  );
}

export default Machine2;