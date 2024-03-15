import axios from "axios";
import { useEffect, useRef } from "react";

type CacheOptions<T> = {
  key: string;
  expirationTime: number;
};

const useCachedDynamicData = <T>(
  url: string,
  cacheOptions: CacheOptions<T>,
  symbol: string
) => {
  const { key, expirationTime } = cacheOptions;
  const cacheKey = `${key}${symbol}`;
  const cachedDataRef = useRef<T | null>(null);

  useEffect(() => {
    if (cachedDataRef.current !== null) {
      // If cached data exists, no need to fetch
      return;
    }
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTime) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(cachedTime) < expirationTime) {
        cachedDataRef.current = parsedData;
        return;
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const responseData = await response.data;
        cachedDataRef.current = responseData;
        localStorage.setItem(cacheKey, JSON.stringify(responseData));
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          String(new Date().getTime())
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, cacheKey, expirationTime]);

  return cachedDataRef.current;
};

export default useCachedDynamicData;
