"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <div className="bg-[#fff]">
      <div className="flex border-b-2 border-gray-300">
        <div className="mx-auto">
          <Image
            src="/Daily.png"
            alt="Daily Blockchain Ph"
            width={600}
            height={300}
          />
        </div>
      </div>
      <div className="flex justify-center border-double border-b-4 bg-[#FFFFFF] space-x-16 py-3 text-[12px]">
        <div> About</div>
        <div> Top News</div>
        <div> Crypto101</div>
        <div> Live Prices</div>
      </div>
    </div>
  );
};

export default NavBar;
