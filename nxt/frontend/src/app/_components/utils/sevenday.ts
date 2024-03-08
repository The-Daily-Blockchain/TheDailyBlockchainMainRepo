import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useGetGraph(symbols: any) {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const interval = "1d";

  const urls = symbols.map(
    (symbol: any) =>
      `/api/graph?symbol=${symbol}&interval=${interval}&startDate=${startDate}`
  );

  const { data, error } = useSWR(urls, fetcher);

  return { data, error };
}
