"use client";
import React, { useState } from "react";
import Image from "next/image";
import MarQuee from "./marquee";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineCopyrightCircle } from "react-icons/ai";
import classNames from "classnames";
import SearchComponent from "./searchingcomponent/searchcomponent";
import MarketCap from "./marketcap";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  // mobile device toggler
  const handleNav = () => {
    setNav(!nav);
  };
  const router = useRouter();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    weekday: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#fff]">
      <div className="flex border-b-2 border-[#ebebeb] items-center">
        <div className="sm:hidden p-4">
          <GiHamburgerMenu
            onClick={handleNav}
            style={{ cursor: "pointer" }}
            size={30}
          />
        </div>
        <div
          className="mx-auto"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        >
          <Image
            className="hover:opacity-80 sm:w-full sm:h-auto"
            src="/Daily.png"
            alt="Daily Blockchain Ph"
            width={700}
            height={400}
            priority
          />
          <div className="hidden lg:block font-bold text-center">
            {formattedDate}
          </div>
        </div>
      </div>
      {/* sm and above */}
      <div className="hidden sm:block">
        <div className="flex justify-center border-double border-b-4 border-[#000] bg-[#FFFFFF] py-3 text-[12px] space-x-16 relative">
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
            onClick={() => router.push(`/donate`)}
          >
            {" "}
            Donate Us
          </div>
          <div className="absolute top-[2px] right-2 md:right-10">
            <SearchComponent />
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="sm:hidden">
        <div className="relative flex justify-center border-double border-b-4 border-[#000] bg-[#FFFFFF] py-3 text-[12px] space-x-16">
          <p style={{ fontWeight: "bold" }}>{formattedDate}</p>
          <div className="absolute top-[2px] right-4">
            <SearchComponent />
          </div>
        </div>
        <div className={classNames("sm:hidden", { block: nav, hidden: !nav })}>
          <div
            className={
              nav
                ? "fixed right-0 sm:right-0 text-black mobile-nav-shadow top-0  w-full h-full bg-gray-500 ease-in-out duration-300 z-10"
                : "ease-in-out duration-300 top-0 h-full w-full fixed right-[-100%] bg-gray-500  z-10"
            }
          >
            <div
              onClick={handleNav}
              className="mt-4 ml-4 hover:opacity-30 hover:cursor-pointer"
            >
              <AiOutlineClose size={20} />
            </div>
            <div className="flex flex-col">
              <div
                onClick={() => {
                  router.push(`/about`);
                  handleNav();
                }}
                className="hover:bg-gray-200 mt-14 pt-3 pl-8 font-bold pb-3 border-b-2 border-solid hover:cursor-pointer"
              >
                ABOUT
              </div>
              <div
                onClick={() => {
                  router.push(`/topnews`);
                  handleNav();
                }}
                className="hover:bg-gray-200 pl-8 pt-3 font-bold pb-3 border-b-2 border-solid hover:cursor-pointer"
              >
                TOP NEWS
              </div>
              <div
                onClick={() => {
                  router.push(`/crypto101`);
                  handleNav();
                }}
                className="hover:bg-gray-200 pl-8 pt-3 font-bold pb-3 border-b-2 border-solid hover:cursor-pointer"
              >
                CRYPTO101
              </div>
              <div
                onClick={() => {
                  router.push(`/liveprices`);
                  handleNav();
                }}
                className="hover:bg-gray-200 pl-8 pt-3 font-bold pb-3 border-b-2 border-solid hover:cursor-pointer"
              >
                LIVE PRICES
              </div>
              <div
                onClick={() => {
                  router.push(`/donate`);
                  handleNav();
                }}
                className="hover:bg-gray-200 pl-8 pt-3 font-bold pb-3 border-b-2 border-solid hover:cursor-pointer"
              >
                DONATE US
              </div>

              <div className="mt-20">
                <div className="flex justify-center font-bold">
                  <AiOutlineCopyrightCircle size={30} /> 2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketCap />
      <MarQuee />
    </div>
  );
};

export default NavBar;
