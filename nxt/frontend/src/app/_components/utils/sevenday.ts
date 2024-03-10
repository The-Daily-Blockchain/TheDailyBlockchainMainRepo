import useSWR from "swr";
import { fetcher, multiFetcher } from "./fetcher";
import { useEffect, useState } from "react";

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
console.log(symbols);
const currentDate = new Date();
const startTime = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
const interval = "1d";

const urls = symbols.map(
  (symbol: any) =>
    `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`
);

console.log(urls);

export function useGetGraph() {
  const [newData, setData] = useState({});

  // const swrData = useSWR(urls, multiFetcher, {
  //   revalidateOnMount: true,
  //   refreshInterval: 1000,
  // });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await multiFetcher(urls);
      setData(fetchedData);
    };

    fetchData();
  }, []);

  console.log(newData);
  return { data: newData };
}
