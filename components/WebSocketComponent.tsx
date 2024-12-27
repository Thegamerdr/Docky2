import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('wss://your-websocket-server-url');

      ws.onopen = () => {
        console.log('WebSocket connection established');
        toast({
          title: "Connected",
          description: "WebSocket connection established",
        });
      };

      ws.onmessage = (event) => {
        console.log('Received message:', event.data);
        // Handle incoming messages here
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "WebSocket Error",
          description: "An error occurred with the WebSocket connection",
          variant: "destructive",
        });
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        toast({
          title: "Disconnected",
          description: `WebSocket connection closed: ${event.reason}`,
          variant: "destructive",
        });
        // Attempt to reconnect after a delay
        setTimeout(connectWebSocket, 5000);
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Status</h2>
      <p>{socket && socket.readyState === WebSocket.OPEN ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
};

export default WebSocketComponent;

