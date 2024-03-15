import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useEffect, useRef } from "react";
import { useDebouncedValue } from "../utils/usedebouncevalue";

export const useMarketData = (symbol: any) => {
  const dataUrls = `https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  const debounceUrl = useDebouncedValue(dataUrls, 300000);
  const { data, isLoading } = useSWR(debounceUrl, fetcher);
  const cachedDataRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      cachedDataRef.current = data;
    }
  }, [data, symbol]);

  const getCachedData = () => {
    return cachedDataRef.current;
  };

  if (!getCachedData()) {
    return { data: null, isLoading: true };
  }

  return { data: getCachedData(), isLoading };
};
