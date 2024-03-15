import axios from "axios";
import { useState, useEffect } from "react";

type CacheOptions<T> = {
  key: string;
  expirationTime: number;
};

function useCachedDynamicData<T>(
  url: string,
  cacheOptions: CacheOptions<T>,
  symbol: string
) {
  const { key, expirationTime } = cacheOptions;
  const cacheKey = `${key}${symbol}`;
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTime) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(cachedTime) < expirationTime) {
        setData(parsedData);
        return;
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const responseData = await response.data;
        setData(responseData);
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

  return data;
}

export default useCachedDynamicData;
