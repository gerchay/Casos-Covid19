import React, { useState, useEffect } from "react";
import io from "socket.io-client";
let socket;

function App() {
  const [response, setResponse] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("Infectados", data => {
      setResponse(data);
      console.log(data);
    });

    return () => socket.disconnect();

  }, []);

  return (
    <>
      <h1>Hola Soy SOCKET</h1>
      <button type="button" className="btn btn-danger btn-lg" onClick={ () => socket.emit('covid')  }> Comenzar</button> 
    </>
  );
}

export default App;
