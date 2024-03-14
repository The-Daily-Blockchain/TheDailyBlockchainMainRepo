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
import { useFetchMarketCap } from "@/app/_components/utils/usefetchmarketcap";
import {
  formatAmount,
  newFormatAmount,
} from "@/app/_components/utils/formatamount";
import useValueArrow from "@/app/_components/utils/usevaluearrow";
import { convertSymbolToName } from "@/app/_components/utils/convertsymboltoname";
import PriceBarChart from "./pricebarchart";
import Loader from "@/app/loader";
import { useMarketData } from "@/app/_components/hooks/marketData";

const StreamComponent = ({ params, name }: any) => {
  const [isClient, setIsClient] = useState(false);
  const { data: marketCap } = useFetchMarketCap(name);
  const { data: dataStream } = useCryptoStream(params) as { data: any };
  const { arrowIcon, valueClassName } = useValueArrow(dataStream.w);
  const symbol = dataStream.s?.split("USDT")[0];

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

  const crypto = "bitcoin";
  const { data: marketData, isLoading } = useMarketData(crypto); // brain not working
  console.log(marketData);

  return (
    <>
      {isClient ? (
        <Table className="mt-3 content-center">
          <TableHeader>
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
              <TableCell className="font-medium ">
                <span className="mr-3">Market Capitalization</span>
                {formatAmount(marketCap)}
              </TableCell>
            </TableRow>
            <TableRow noBorder={true}>
              <TableCell className="font-medium">
                <span className="mr-3">24 Hour Trading Volume</span>
                {newFormatAmount(parseFloat(dataStream.q))}
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
