"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { multiFetcher } from "@/app/_components/utils/fetcher";
import { useDebouncedValue } from "@/app/_components/utils/usedebouncevalue";

function Page() {
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
  console.log("symbols", symbols);

  const urls = symbols.map(
    (symbol) =>
      `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`
  );
  console.log("looping", urls);

  const debounceUrls = useDebouncedValue(urls, 1000000);

  const newData = useRef({});
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await multiFetcher(debounceUrls);
      newData.current = fetchedData;
    };

    fetchData();
    console.log("fetchData");
  }, [debounceUrls]);
  console.log(newData.current);
  console.log(newData);

  return (
    <div>
      <h1>Graph Data</h1>
      <pre>{JSON.stringify(newData.current, null, 2)}</pre>
    </div>
  );
}

export default Page;
