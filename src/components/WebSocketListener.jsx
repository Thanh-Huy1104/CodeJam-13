import React, { useState, useEffect } from 'react';

function WebSocketListener() {
  const [messages, setMessages] = useState([]);

  // Replace with your WebSocket server URL
  const serverUrl = 'wss://4135-2605-8d80-580-be89-902f-aaea-f3bc-d116.ngrok.io';

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

    // Clean up function to close WebSocket connection
    return () => {
      ws.close();
    };
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