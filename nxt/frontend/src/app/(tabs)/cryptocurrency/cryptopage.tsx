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
      <div
        className="border-2 rounded-xl mt-10 ml-5 w-[450px] shadow-2xl"
        style={{
          boxShadow:
            "2px 2px 0 rgba(148, 87, 235, 0.5), 4px 4px 0 rgba(203, 81, 247, 0.5)",
        }}
      >
        <StreamComponent params={symbolWithUSDT} name={name} />
      </div>
      <div>weqe</div>
    </div>
  );
};

export default CryptoPage;
