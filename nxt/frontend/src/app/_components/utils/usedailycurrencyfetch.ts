import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { api_key_currency } from "@/app/config";

const useDailyCurrencyFetch = () => {
  // const [data, setData] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${api_key_currency}&symbols=PHP`
        );
        // setData(response.data.rates.PHP);
        intervalRef.current = response.data.rates.PHP;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 86400000);

    return () => clearInterval(intervalId);
  }, []);

  return { data: intervalRef.current };
};

export default useDailyCurrencyFetch;
