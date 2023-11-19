import React, { useState, useEffect } from 'react';

function WebSocketListener() {
  const [messages, setMessages] = useState([]);

  // Replace with your WebSocket server URL
  const serverUrl = 'wss://0365-142-117-215-213.ngrok.io';

  useEffect(() => {
    const ws = new WebSocket(serverUrl);

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onmessage = (event) => {
      // Update state with the new message
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    //TODO: Research if we are supposed to close the websocket connection when the component unmounts

  }, []);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocketListener;