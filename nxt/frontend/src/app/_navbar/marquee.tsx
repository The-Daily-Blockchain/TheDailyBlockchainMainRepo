/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect, useState } from "react";

import Marquee from "react-fast-marquee";
import { Constants } from "../_components/constants/common/constants";

interface Crypto {
  symbol: string;
  current_price: Number | string;
  id: string;
  name: string;
  image: string;
  price_change_percentage_24h?: Number;
}

const MarQuee = () => {
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);

  const crypto_api = Constants.crypto_api;
  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch(crypto_api);

        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const data = await res.json();
        setCrypto(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCrypto();

    const interval = setInterval(() => {
      fetchCrypto();
    }, 50000);
    return () => clearInterval(interval);
  }, [crypto_api]);

  return (
    <div>
      {!isLoading && (
        <Marquee>
          <div className="hidden sm:block">
            <div className="flex border-b-4 border-[#000]">
              {crypto.map((coin) => (
                <div
                  className="mr-3 flex border-solid border-black border-r-2 pr-2"
                  key={coin.id}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 mt-2 mr-2 rounded-full"
                  />

                  <div className="grid grid-cols-1 mr-2">
                    <span> {coin.name}</span>
                    <span>{coin.symbol.toUpperCase()}</span>
                  </div>
                  <div className="grid grid-cols-1">
                    ₱{coin.current_price.toLocaleString("en-US")}
                    <p
                      className={`justify-self-center px-1 ${
                        typeof coin.price_change_percentage_24h === "number"
                          ? coin.price_change_percentage_24h < 0
                            ? "text-red-500"
                            : "text-green-500"
                          : "N/A"
                      }`}
                    >
                      {typeof coin.price_change_percentage_24h === "number"
                        ? coin.price_change_percentage_24h.toFixed(2)
                        : "N/A"}
                      %
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* mobile */}
          <div className="sm:hidden">
            <div className="flex border-b-2 border-[#000]">
              {crypto.map((coin) => (
                <div
                  className="mr-2 flex border-solid border-black border-r-2 pr-2"
                  key={coin.id}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-4 h-4 mt-2 mr-2 rounded-full"
                  />

                  <div className="grid grid-cols-1 mr-2">
                    <span className="text-[10px]"> {coin.name}</span>
                    <span className="text-[10px]">
                      {coin.symbol.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 text-[10px]">
                    ₱{coin.current_price.toLocaleString("en-US")}
                    <p
                      className={`justify-self-center px-1 ${
                        typeof coin.price_change_percentage_24h === "number"
                          ? coin.price_change_percentage_24h < 0
                            ? "text-red-500"
                            : "text-green-500"
                          : "N/A"
                      }`}
                    >
                      {typeof coin.price_change_percentage_24h === "number"
                        ? coin.price_change_percentage_24h.toFixed(2)
                        : "N/A"}
                      %
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Marquee>
      )}
    </div>
  );
};
export default MarQuee;
