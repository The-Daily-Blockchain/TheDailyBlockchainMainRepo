"use client";
import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import { nameToSymbol } from "@/app/_components/utils/cryptomappings";
import React from "react";
import StreamComponent from "./streamcomponent";

const CryptoPage = ({ params }: any) => {
  const name = params;
  const symbol = nameToSymbol[name];
  const symbolWithUSDT = symbol + "usdt";
  return (
    <div className="grid grid-cols-[1fr,2fr]">
      <div className="border-double border-r-4 border border-b-4 rounded-xl mt-10 ml-5 w-[450px]">
        <StreamComponent params={symbolWithUSDT} name={name} />
      </div>
      <div>weqe</div>
    </div>
  );
};

export default CryptoPage;
