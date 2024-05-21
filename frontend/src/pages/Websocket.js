import React, { useState, useEffect } from "react";
import { getdata } from "../model/wirelessIP";
import Machine1 from "../components/Machine1";
import Machine2 from "../components/Machine2";

function Websocket() {
  const [ipAddress, setipAddress] = useState(0);

  useEffect(() => {
    getdata()
    .then((response) => {
      if (response) {
        setipAddress(response.data);
      }
    })
    .catch(error => {
      console.log(error);
  });
  }, [ipAddress]);

  return (
    <div className="container">
      {ipAddress === "192.168.0.100" ? <Machine2 ipAddress={ipAddress} /> : <Machine1 ipAddress={ipAddress} />}
    </div>
  );
}

export default Websocket;