"use client";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/app/_components/utils/fetcher";
import useSWR from "swr";
import Loader from "@/app/loader";
import Error from "@/app/error";

// ETH SOL XRP ADA DODGE SHIB AVAX DOT TRX LINK MATIC UNI TON LTC

const New = () => {
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
      "AVAXUSDT",
      "DOTUSDT",
      "TRXUSDT",
      "LINKUSDT",
      "MATICUSDT",
      "UNIUSDT",
      "LTCUSDT",
    ])
  );

  const apiEndpoint = `${binanceBaseUrl}/api/v3/ticker/24hr?symbols=${query}&type=MINI`;

  const { data, isLoading, error } = useSWR(apiEndpoint, fetcher);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      {data?.map?.((item: any, index: any) => (
        <div key={index}>
          <p>{item.symbol}</p>
        </div>
      ))}
    </div>
  );
};

export default New;
