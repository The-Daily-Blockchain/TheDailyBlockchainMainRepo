"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// ETH SOL XRP ADA DODGE SHIB AVAX DOT TRX LINK MATIC UNI TON LTC

const Page = () => {
  const [tickerData, setTickerData] = useState<Array<{ symbol: string }>>([]);
  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const binanceBaseUrl = "https://api.binance.com";
        const query = encodeURIComponent(
          JSON.stringify([
            "BTCUSDT",
            "ETHUSDT",
            "BNBUSDT",
            "SOLUSDT",
            "XRPUSDT",
            "ADAUSDT",
            "DOGEUSDT",
            "SHIBUSDT",
            "AVAXUSDT",
            "DOTUSDT",
            "TRXUSDT",
            "LINKUSDT",
            "MATICUSDT",
            "UNIUSDT",
            "LTCUSDT",
          ])
        );
        // "%5B%22BTCUSDT%22,%22ETHUSDT%22,%22BNBUSDT%22,%22SOLUSDT%22,%22XRPUSDT%22,%22ADAUSDT%22,%22DOGEUSDT%22,%22SHIBUSDT%22,%22AVAXUSDT%22,%22DOTUSDT%22,%22TRXUSDT%22,%22LINKUSDT%22,%22MATICUSDT%22,%22UNIUSDT%22,%22LTCUSDT%22%5D";
        const apiEndpoint = `${binanceBaseUrl}/api/v3/ticker/24hr?symbols=${query}&type=MINI`;

        const response = await axios.get(apiEndpoint);

        setTickerData(response.data);
      } catch (error) {}
    };
    fetchTickerData();
  }, []);

  return (
    <div>
      {tickerData.map((item, index) => (
        <div key={index}>
          <p>{item.symbol}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
