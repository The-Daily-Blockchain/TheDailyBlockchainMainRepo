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

  // Transform the data into an array of objects with symbols as keys
  const transformedData = data
    ? symbols.reduce((acc: any, symbol: any, index: number) => {
        // Check if data[index] exists and is an array before assigning it
        if (data[index] && Array.isArray(data[index])) {
          acc[symbol] = data[index];
        }
        return acc;
      }, {})
    : null;

  return { data: transformedData, error };
}
