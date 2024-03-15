import { useEffect, useRef } from "react";
import axios from "axios";
import { useDebouncedValue } from "./usedebouncevalue";

export const useFetchMarketCap = (name: string) => {
  const intervalRef = useRef(null);
  const endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd%2C%20php&include_market_cap=true`;
  const debounceEndpoint = useDebouncedValue(endPoint, 86400000);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(debounceEndpoint);
        intervalRef.current = response.data[name].usd_market_cap;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [debounceEndpoint, name]);

  return { data: intervalRef.current };
};
