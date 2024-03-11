import { useEffect, useRef, useState } from "react";

export const useWebSocket = () => {
  const [tickerData, setTickerData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const query =
      "btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/solusdt@ticker/xrpusdt@ticker/adausdt@ticker/dogeusdt@ticker/avaxusdt@ticker/dotusdt@ticker/trxusdt@ticker/linkusdt@ticker/maticusdt@ticker/uniusdt@ticker/ltcusdt@ticker";

    const connectWebSocket = () => {
      socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${query}`
      );

      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        const pair = newData.stream.split("@")[0];

        setTickerData((prevData) => {
          const newDataCopy = { ...prevData };
          newDataCopy[pair] = newData.data;
          return newDataCopy;
        });

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
  }, []);
  return { tickerData, isLoading };
};
