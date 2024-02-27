import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export function useSearch(title: any) {
  return useSWR(title ? `/api/search?title=${title}` : null, fetcher);
}
