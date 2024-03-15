import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import {
  formatAmount,
  formatNumberWithCommas,
  newFormatAmount,
} from "@/app/_components/utils/formatamount";
import useValueArrow from "@/app/_components/utils/usevaluearrow";
import { convertSymbolToName } from "@/app/_components/utils/convertsymboltoname";
import PriceBarChart from "./pricebarchart";
import Loader from "@/app/loader";
import { useMarketData } from "@/app/_components/hooks/marketData";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { partial } from "lodash";
import { IoInformationCircleOutline } from "react-icons/io5";
import PercentBarChart from "./percentbarchart";

const StreamComponent = ({ params, name }: any) => {
  const [isClient, setIsClient] = useState(false);
  const { data: dataStream } = useCryptoStream(params) as { data: any };
  const { arrowIcon, valueClassName } = useValueArrow(dataStream.w);
  const symbol = dataStream.s?.split("USDT")[0];
  const { data: marketData }: { data: any } = useMarketData(name);
  const { imageUrl } = convertSymbolToName(symbol);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formattedData = [
    {
      name: dataStream.s,
      high: parseFloat(dataStream.h),
      low: parseFloat(dataStream.l),
      current: parseFloat(dataStream.w),
    },
  ];
  const reshapePercentPayload = [
    {
      cir_supply: marketData?.market_data?.circulating_supply,
      total_supply: marketData?.market_data?.total_supply,
      base: 0,
    },
  ];

  return (
    <>
      {isClient ? (
        <Table className="mt-3 mb-3 content-center">
          <TableHeader>
            <TableRow className="flex" noBorder={true}>
              <span className=" ml-4 mt-2 w-8 h-8 flex items-center justify-center text-lg font-semibold border-solid border-2 border-indigo-500 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                {marketData?.market_data?.market_cap_rank || "∞"}
              </span>
              <span className="ml-2 mt-[15px] font-bold">
                Cryptocurrency rank
              </span>
            </TableRow>
            <TableRow noBorder={true} className="grid justify-center mt-5 ">
              <TableHead
                noBorder={true}
                className="flex text-left text-xl text-black w-[200px] "
              >
                <span className="mr-2">
                  <Image
                    className="rounded-full"
                    src={imageUrl || 0}
                    alt=""
                    width={30}
                    height={30}
                  />
                </span>
                {capitalizeFirstLetter(name)}
              </TableHead>
              <TableHead
                noBorder={true}
                className="grid grid-cols-2 justify-center"
              >
                <span className="text-3xl text-left font-bold text-black w-[100px]">
                  ${newFormatAmount(parseFloat(dataStream.w))}
                </span>
                <span className={`${valueClassName} ml-2 w-[160px]`}>
                  {arrowIcon} {newFormatAmount(parseFloat(dataStream.P))}%
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="grid justify-center">
            <PriceBarChart data={formattedData} />
            <TableRow noBorder={true}>
              <TableCell className="font-medium flex">
                <span className="mr-3">Market Capitalization</span>$
                {formatAmount(marketData?.market_data?.market_cap?.usd) || "∞"}
                <span className="ml-1 mt-[3px]  delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      The market capitalization of cryptocurrencies represents
                      the total value of all digital assets circulating in the
                      market, indicating the collective investor interest and
                      perceived worth of these decentralized digital currencies.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </TableCell>
            </TableRow>
            <TableRow noBorder={true}>
              <TableCell className="font-medium">
                <span className="mr-3">24 Hour Trading Volume</span>$
                {newFormatAmount(parseFloat(dataStream.q))}
              </TableCell>
            </TableRow>
            <TableRow noBorder={true}>
              <TableCell className="font-medium flex">
                <span className="mr-3">Circulating Supply</span>
                {formatNumberWithCommas(
                  parseFloat(marketData?.market_data?.circulating_supply)
                )}
                <span className="ml-1 mt-[2px]  delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      Circulating supply in the cryptocurrency market refers to
                      the total number of digital coins or tokens that are
                      actively circulating and available for trading, providing
                      insight into the liquidity and market dynamics of a
                      particular cryptocurrency.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </TableCell>
              <TableRow noBorder={true}>
                <PercentBarChart data={reshapePercentPayload} />
              </TableRow>
            </TableRow>
            <TableRow className="mt-3" noBorder={true}>
              <TableCell className="font-medium flex">
                <span className="mr-3">Total Supply</span>
                {marketData &&
                marketData.market_data &&
                marketData.market_data.total_supply
                  ? formatNumberWithCommas(
                      parseFloat(marketData.market_data.total_supply)
                    )
                  : "∞"}
                <span className="ml-1 mt-[2px] delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      Total supply in the realm of cryptocurrency denotes the
                      maximum quantity of digital coins or tokens that will ever
                      be created for a specific cryptocurrency, crucial for
                      understanding the potential inflationary or deflationary
                      pressures on its value over time.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        ""
      )}
    </>
  );
};

export default StreamComponent;
