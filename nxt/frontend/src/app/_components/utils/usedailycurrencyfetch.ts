import { useEffect, useRef } from "react";
import axios from "axios";
import { api_key_currency } from "@/app/config";
import { useDebouncedValue } from "./usedebouncevalue";

export const useDailyCurrencyFetch = () => {
  const intervalRef = useRef(null);

  const currency = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${api_key_currency}&symbols=PHP`;

  const debounceCurrency = useDebouncedValue(currency, 86400000);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(debounceCurrency);
      intervalRef.current = response.data.rates.PHP;
    };
    fetchData();
  }, [debounceCurrency]);

  return { data: intervalRef.current };
};
