import React, { useState, useEffect } from "react";
import { formatAmount } from "../_components/utils/formatamount";

const MarketCap = () => {
  const [marketCap, setMarketCap] = useState<number | null>(null);
  const [activeCrypto, setActiveCrypto] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketCap = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const active = data.data.active_cryptocurrencies;
        const values = Object.values(data.data.total_market_cap).slice(0, 12);
        const totalMarketCap: any = values.reduce(
          (acc: any, value: any) => acc + value,
          0
        );

        setMarketCap(totalMarketCap);
        setActiveCrypto(active);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };

    fetchMarketCap();

    const interval = setInterval(fetchMarketCap, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!loading && (
        <div className="border-solid border-b-2 border-black flex justify-center">
          <p className="mr-4">Total Market Cap: ${formatAmount(marketCap)}🔥</p>
          <p>
            Total Active Cryptocurrencies: {activeCrypto?.toLocaleString()}🔥
          </p>
        </div>
      )}
    </>
  );
};

export default MarketCap;
