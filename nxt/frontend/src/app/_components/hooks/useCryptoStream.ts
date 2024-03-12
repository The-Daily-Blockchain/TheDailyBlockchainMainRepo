import { useEffect, useState } from "react";

export const useCryptoStream = (query: any) => {
  const [data, setTickerData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
      socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${query}@ticker`
      );

      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setTickerData(newData);
        setIsLoading(false);
      };

      socket.onclose = () => {
        setTimeout(connectWebSocket, 24 * 60 * 60 * 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [query]);
  return { data, isLoading };
};
