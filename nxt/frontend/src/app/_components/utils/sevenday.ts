import useSWR from "swr";
import { fetcher, multiFetcher } from "./fetcher";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "./usedebouncevalue";

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

export const useGetGraph = () => {
  const [newData, setData] = useState({});

  const debounceUrls = useDebouncedValue(urls, 86400000);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await multiFetcher(debounceUrls);
      setData(fetchedData);
    };

    fetchData();
  }, [debounceUrls]);

  const debounceData = useDebouncedValue(newData, 1000000);
  console.log("deboundData:", debounceData);

  return { data: debounceData };
};
