import axios from "axios";
import { useState, useEffect } from "react";

type CacheOptions<T> = {
  key: string;
  expirationTime: number;
};

function useCachedData<T>(url: string, cacheOptions: CacheOptions<T>) {
  const { key, expirationTime } = cacheOptions;
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(key);
    const cachedTime = localStorage.getItem(`${key}_timestamp`);

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
        const responseData = await response.data();
        setData(responseData);
        localStorage.setItem(key, JSON.stringify(responseData));
        localStorage.setItem(`${key}_timestamp`, String(new Date().getTime()));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, key, expirationTime]);

  return data;
}

export default useCachedData;
