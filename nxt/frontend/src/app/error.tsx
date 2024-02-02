"use client";
import React from "react";
import Image from "next/image";

const Error = () => {
  return (
    <div className="flex items-center align-center justify-center text-center h-screen bg-[#2e7177]">
      <div className="grid grid-cols-1 text-white text-[80px]">
        <div>Error 404</div>
        <div>
          <Image
            className="border-solid border-2 border-green border-[#328087]"
            src="/404.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
