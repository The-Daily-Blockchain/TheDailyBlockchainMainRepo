import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useGetGraph(symbol: any) {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  return useSWR(
    `/api/graph?symbol=${symbol}&interval=1d&startTime=${startDate}`,
    fetcher
  );
}
