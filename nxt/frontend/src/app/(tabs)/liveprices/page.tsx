"use client";
import React, { Suspense, useEffect, useState } from "react";

import Image from "next/image";
import Loading from "./loading";
import dayjs from "dayjs";
import { Constants } from "@/app/_components/constants/common/constants";
import { useGetGraph } from "@/app/_components/utils/sevenday";

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
    const fetchCrypto = async () => {
      try {
        const res = await fetch(crypto_api);
        const data = await res.json();
        setCrypto(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCrypto();

    const interval = setInterval(() => {
      fetchCrypto();
    }, 10000);
    return () => clearInterval(interval);
  });

  if (isLoading) return <Loading />;
  if (!crypto) return <Loading />;

  const currentDate = dayjs();
  const formattedDate = currentDate.format("MMM DD, YYYY");
  const formattedHour = currentDate.format("hh:mm A");
  return (
    <>
      <div>
        <div className="relative">
          <div className="grid items-center justify-center my-5">
            <div className="border-solid border-4 border-gray-700 px-6">
              <div className="flex text-center text-[36px] font-bold pt-2">
                <Image
                  src="/LOGO.png"
                  width={53}
                  height={40}
                  alt="Picture of the Crypto"
                />
                AILY PRICE UPDATE
              </div>
              <p className="text-center text-[14px] ">via coingecko</p>
              <div className="relative grid grid-cols-1">
                <div className="text-[9px]">{formattedDate}</div>
                <div className="text-[9px]">{formattedHour}</div>
              </div>
              <div className="text-right bg-black font-bold"></div>
              <div className="max-w-sm grid grid-cols-4 items-center text-center  border-solid mb-4">
                <p className="justify-self-center px-1"></p>
                <p className="justify-self-center px-1">Crypto Currency</p>
                <p className="justify-self-center px-1">Price</p>
                <p className="justify-self-center px-1">24hr Change</p>
              </div>
              {crypto.map((cryptos, index) => (
                <div
                  key={cryptos.id}
                  className={`max-w-md grid grid-cols-4 border-solid border-b-2 border-gray-400 items-center py-2 ${
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
                    %
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

// gonna use binance api and shadcn
