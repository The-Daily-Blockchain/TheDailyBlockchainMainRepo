"use client";
import { fetcher, multiFetcher } from "./fetcher";
import { useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "./usedebouncevalue";

export const useGetGraph = () => {
  const symbols = [
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
  ];
  const currentDate = new Date();
  const startTime = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  const interval = "1d";

  const urls = symbols.map(
    (symbol: any) =>
      `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`
  );
  const debounceUrls = useDebouncedValue(urls, 86400000);

  const newData = useRef({});
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await multiFetcher(debounceUrls);
      newData.current = fetchedData;
    };

    fetchData();
  }, [debounceUrls]);

  return { data: newData.current };
};
