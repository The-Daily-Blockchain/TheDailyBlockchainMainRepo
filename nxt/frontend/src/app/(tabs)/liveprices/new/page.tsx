"use client";
import React, { useEffect, useState } from "react";

type TickerData = {
  p: any;
  P: any;
  w: any;
  x: any;
  Q: any;
  b: any;
  B: any;
  a: any;
  A: any;
  O: any;
  C: any;
  F: any;
  L: any;
  n: any;
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
      "btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/solusdt@ticker/xrpusdt@ticker/adausdt@ticker/dogeusdt@ticker/shibusdt@ticker/avaxusdt@ticker/dotusdt@ticker/trxusdt@ticker/linkusdt@ticker/maticusdt@ticker/uniusdt@ticker/ltcusdt@ticker";
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
            <th>Price change</th>
            <th>Price change percent</th>
            <th>Price</th>
            <th>Open Price</th>
            <th>Close Price</th>
            <th>High 24hr</th>
            <th>Low 24hr</th>
            <th>volume traded in usd</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tickerData)
            .sort((pairA: any, pairB: any) => {
              const bidPriceA = parseFloat(tickerData[pairA].w);
              const bidPriceB = parseFloat(tickerData[pairB].w);
              return bidPriceB - bidPriceA;
            })
            .map((pair: any) => (
              <tr key={pair}>
                <td>{tickerData[pair].s}</td>
                <td
                  style={{
                    color: parseFloat(tickerData[pair].p) < 0 ? "red" : "green",
                  }}
                >
                  {parseFloat(tickerData[pair].p).toLocaleString()}
                </td>
                <td
                  style={{
                    color: parseFloat(tickerData[pair].P) < 0 ? "red" : "green",
                  }}
                >
                  {parseFloat(tickerData[pair].P).toFixed(2)}%
                </td>
                <td>
                  {parseFloat(tickerData[pair].w).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {parseFloat(tickerData[pair].o).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {parseFloat(tickerData[pair].c).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {parseFloat(tickerData[pair].h).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {parseFloat(tickerData[pair].l).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {parseFloat(tickerData[pair].q).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
