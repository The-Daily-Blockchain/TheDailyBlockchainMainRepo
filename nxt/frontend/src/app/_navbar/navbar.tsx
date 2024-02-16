"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MarQuee from "./marquee";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-[#fff]">
      <div className="flex border-b-2 border-[#ebebeb]">
        <div
          className="mx-auto"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        >
          <Image
            className="hover:opacity-80"
            src="/Daily.png"
            alt="Daily Blockchain Ph"
            width={700}
            height={400}
          />
        </div>
      </div>
      <div className="flex justify-center border-double border-b-4 border-[#000] bg-[#FFFFFF] space-x-16 py-3 text-[12px]">
        <div
          className="no-underline hover:underline hover:opacity-60"
          onClick={() => router.push("/about")}
          style={{ cursor: "pointer" }}
        >
          {" "}
          About
        </div>
        <div
          className="no-underline hover:underline hover:opacity-60"
          onClick={() => router.push("/topnews")}
          style={{ cursor: "pointer" }}
        >
          {" "}
          Top News
        </div>
        <div
          className="no-underline hover:underline hover:opacity-60"
          onClick={() => router.push("/crypto101")}
          style={{ cursor: "pointer" }}
        >
          {" "}
          Crypto101
        </div>
        <div
          className="no-underline hover:underline hover:opacity-60"
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/liveprices`)}
        >
          Live Prices
        </div>
        <div
          className="no-underline hover:underline hover:opacity-60"
          style={{ cursor: "pointer" }}
        >
          {" "}
          Donate Us
        </div>
      </div>
      <MarQuee />
    </div>
  );
};

export default NavBar;
