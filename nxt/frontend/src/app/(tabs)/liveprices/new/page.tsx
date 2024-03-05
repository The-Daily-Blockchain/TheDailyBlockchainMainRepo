"use client";
import React, { useEffect, useState } from "react";

type TickerData = {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
};

const Page = () => {
  const [tickerData, setTickerData] = useState<TickerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const query =
      "btcusdt@miniTicker/ethusdt@miniTicker/bnbusdt@miniTicker/solusdt@miniTicker/xrpusdt@miniTicker/adausdt@miniTicker/dogeusdt@miniTicker/shibusdt@miniTicker/avaxusdt@miniTicker/dotusdt@miniTicker/trxusdt@miniTicker/linkusdt@miniTicker/maticusdt@miniTicker/uniusdt@miniTicker/ltcusdt@miniTicker";
    const connectWebSocket = () => {
      socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${query}`
      );

      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        const pair = newData.stream.split("@")[0];
        console.log(pair);
        setTickerData((prevData) => ({
          ...prevData,
          [pair]: newData.data,
        }));

        setIsLoading(false);
      };

      socket.onclose = () => {
        // Automatically reconnect after 24 hours
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

  return (
    <div>
      <h1>Binance Mini Ticker Stream</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Close Price</th>
            <th>Open Price</th>
            <th>Highest Price</th>
            <th>Lowest Price</th>
            <th>Volume (Base Asset)</th>
            <th>Volume (Quote Asset)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tickerData).map((pair: any) => (
            <tr key={pair}>
              {/* {Object.entries(tickerData[pair]).map(
                ([key, value]: [string, any]) => (
                  <td key={key}>{value}</td>
                )
              )} */}
              <td>{tickerData[pair].e}</td>
              <td>{tickerData[pair].E}</td>
              <td>{tickerData[pair].s}</td>
              <td>{tickerData[pair].c}</td>
              <td>{tickerData[pair].o}</td>
              <td>{tickerData[pair].h}</td>
              <td>{tickerData[pair].l}</td>
              <td>{tickerData[pair].v}</td>
              <td>{tickerData[pair].q}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
