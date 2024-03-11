import { useEffect, useRef } from "react";
import axios from "axios";
import { api_key_currency } from "@/app/config";
import { useDebouncedValue } from "./usedebouncevalue";

export const useDailyCurrencyFetch = () => {
  const intervalRef = useRef(null);

  const currencyUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${api_key_currency}&symbols=PHP`;

  const debounceCurrency = useDebouncedValue(currencyUrl, 86400000);

  useEffect(() => {
    const fetchData = async () => {
      const lastFetchedDate = localStorage.getItem("currencyLastFetched");
      const currentDate = new Date().toISOString().slice(0, 10);

      if (lastFetchedDate !== currentDate) {
        try {
          const response = await axios.get(debounceCurrency);
          intervalRef.current = response.data.rates.PHP;
          localStorage.setItem("currencyLastFetched", currentDate);
        } catch (error) {
          console.error("Error fetching currency data:", error);
        }
      } else {
        const cachedData = localStorage.getItem("cachedCurrencyData");
        if (cachedData) {
          intervalRef.current = JSON.parse(cachedData);
        }
      }
    };

    fetchData();
  }, [debounceCurrency]);

  return { data: intervalRef.current };
};
