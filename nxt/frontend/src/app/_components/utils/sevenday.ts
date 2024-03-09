import useSWR from "swr";
import { fetcher, multiFetcher } from "./fetcher";
import { useEffect, useState } from "react";

export function useGetGraph(symbols: any) {
  const [newData, setData] = useState({});
  const currentDate = new Date();
  const startTime = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  const urls = symbols.map(
    (symbol: any) =>
      `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=1d`
  );

  const swrData = useSWR(urls, multiFetcher);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await multiFetcher(urls);
      setData(fetchedData);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: newData };
}
