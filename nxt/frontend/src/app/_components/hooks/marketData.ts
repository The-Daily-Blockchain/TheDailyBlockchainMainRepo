import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useMarketData = (symbol: any) => {
  const dataUrls = `api/marketdata/?symbol=${symbol}&localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const { data, isLoading } = useSWR(dataUrls, fetcher);
  console.log(data);

  return { data, isLoading };
};
