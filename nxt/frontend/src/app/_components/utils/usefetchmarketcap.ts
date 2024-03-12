import { useEffect, useRef } from "react";
import axios from "axios";

export const useFetchMarketCap = (name: any) => {
  const intervalRef = useRef(null);
  const endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd%2C%20php&include_market_cap=true`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endPoint);
        intervalRef.current = response.data[name].usd_market_cap;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [endPoint, name]);
  console.log(intervalRef.current);

  return { data: intervalRef.current };
};
