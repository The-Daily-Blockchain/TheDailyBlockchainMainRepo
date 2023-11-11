import React, { useEffect, useState } from "react";
import Image from "next/image";

import Marquee from "react-fast-marquee";
import { Constants } from "../(values)/(constants)/constants";

interface Crypto {
  current_price: any;
  id: string;
  name: string;
  image: string;
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
    }, 60000); // Fetch data every minute (60000 milliseconds)

    // Cleanup function
    return () => clearInterval(interval);
  });

  return (
    <Marquee>
      <div className="flex">
        {crypto.map((coin) => (
          <div className="mr-2" key={coin.id}>
            <Image src="/coin.image" width={56} height={56} alt={coin.name} />
            {coin.name}₱{coin.current_price.toLocaleString("en-US")}
          </div>
        ))}
      </div>
    </Marquee>
  );
};
export default MarQuee;
