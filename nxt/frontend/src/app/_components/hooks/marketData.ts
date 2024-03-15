import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useEffect, useRef } from "react";
import { useDebouncedValue } from "../utils/usedebouncevalue";
import useCachedDynamicData from "./usecacheddynamicdata";

export const useMarketData = (symbol: any) => {
  const dataUrls = `https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const cacheOptions = {
    key: "market_data_of_",
    expirationTime: 8640000,
  };

  const data = useCachedDynamicData(dataUrls, cacheOptions, symbol);
  const cachedDataRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      cachedDataRef.current = data;
    }
  }, [data, symbol]);

  console.log(data);

  return { data: data };
};
