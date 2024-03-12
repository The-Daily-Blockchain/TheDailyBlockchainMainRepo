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
      <StreamComponent params={symbolWithUSDT} name={name} />
      <div>weqe</div>
    </div>
  );
};

export default CryptoPage;
