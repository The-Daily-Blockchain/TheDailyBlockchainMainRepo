/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect, useState } from "react";

import Marquee from "react-fast-marquee";
import { Constants } from "../(values)/(constants)/constants";

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

  const crypto_api = Constants.crypto_api;
  useEffect(() => {
    const fetchCrypto = () => {
      fetch(crypto_api)
        .then((res) => res.json())
        .then((data) => {
          setCrypto(data);
        });
    };
    fetchCrypto(); // Fetch data for the first time

    const interval = setInterval(() => {
      fetchCrypto();
    }, 50000); // Fetch data every minute (60000 milliseconds)

    // Cleanup function
    return () => clearInterval(interval);
  });

  return (
    <Marquee>
      <div className="flex">
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
    </Marquee>
  );
};
export default MarQuee;
