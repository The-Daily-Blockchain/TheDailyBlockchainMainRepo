import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useMarketData = (symbol: any) => {
  const dataUrls = `api/marketdata/${symbol}`;
  const { data, isLoading } = useSWR(dataUrls, fetcher);
  console.log(data);

  return { data, isLoading };
};
