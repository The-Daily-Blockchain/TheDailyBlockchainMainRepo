import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative h-[100px] w-[100px]">
        <div className="animate-spin absolute rounded-full border-8 border-t-[#656565] border-r-[#9a9998] border-b-[#dfdede] border-l-[#d3c7b9] h-[130px] w-[130px] left-[-15px] top-[-15px]" />
        <div className="animate-spin absolute rounded-full border-8 h-[100px] border-b-[#656565] border-l-[#9a9998] border-t-[#dfdede] border-r-[#d3c7b9] w-[100px]" />
        <Image
          src="/black.png"
          alt="Loader"
          width={100}
          height={100}
          className="absolute bottom-[6px]"
        />
      </div>
    </div>
  );
}
