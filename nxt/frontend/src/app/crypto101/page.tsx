"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Constants } from "../(values)/(constants)/constants";
import Image from "next/image";
import Loading from "./loading";

interface Crypto {
  symbol: string;
  current_price: Number | string;
  id: string;
  name: string;
  image: string;
  price_change_percentage_24h?: Number;
}

const CrytoPage = () => {
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);

  const crypto_api = Constants.crypto_api;
  useEffect(() => {
    const fetchCrypto = () => {
      fetch(crypto_api)
        .then((res) => res.json())
        .then((data) => {
          setCrypto(data);
          setLoading(false);
        });
    };
    fetchCrypto();

    const interval = setInterval(() => {
      fetchCrypto();
    }, 10000);
    return () => clearInterval(interval);
  });

  if (isLoading) return <Loading />;
  if (!crypto) return <Loading />;

  return (
    <>
      <div>
        <div className="relative">
          <div className="grid items-center justify-center my-5">
            <div className="border-solid border-4 border-gray-700">
              <div className="text-center text-[36px] font-bold text-white bg-black">
                DAILY PRICE UPDATE
              </div>
              <p className="text-center text-[14px] bg-black text-white">
                via coingecko
              </p>
              <div className="relative bg-black">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  src="/LOGO.png"
                  width={40}
                  height={40}
                  alt="Picture of the Crypto"
                />
              </div>
              <div className="text-right bg-black font-bold"></div>
              <div className="max-w-sm grid grid-cols-4 items-center text-center bg-black text-white border-solid">
                <p className="justify-self-center px-1"></p>
                <p className="justify-self-center px-1">CRYPTOCURRENCY</p>
                <p className="justify-self-center px-1">PRICE</p>
                <p className="justify-self-center px-1">24hr CHANGE</p>
              </div>
              {crypto.map((cryptos, index) => (
                <div
                  key={cryptos.id}
                  className={`max-w-md grid grid-cols-4 border-solid border-b-2 bg-black text-white border-gray-400 items-center p-2 ${
                    index >= crypto.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                  <img
                    src={cryptos.image}
                    className="h-[35px] w-[35px] justify-self-center"
                  />
                  <p className="justify-self-center px-1">{cryptos.name}</p>
                  <p className="justify-self-center px-1">
                    ₱{cryptos.current_price.toLocaleString("en-US")}
                  </p>
                  <p
                    className={`justify-self-center px-1 ${
                      typeof cryptos.price_change_percentage_24h === "number"
                        ? cryptos.price_change_percentage_24h < 0
                          ? "text-red-500"
                          : "text-green-500"
                        : "N/A"
                    }`}
                  >
                    {typeof cryptos.price_change_percentage_24h === "number"
                      ? cryptos.price_change_percentage_24h.toFixed(2)
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrytoPage;
