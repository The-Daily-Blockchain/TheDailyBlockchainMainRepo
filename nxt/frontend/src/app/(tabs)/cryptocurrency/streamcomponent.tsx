import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import Image from "next/image";
import React from "react";
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

const StreamComponent = ({ params, name }: any) => {
  const { data: marketCap } = useFetchMarketCap(name);
  const { data: dataStream } = useCryptoStream(params) as { data: any };
  const { arrowIcon, valueClassName } = useValueArrow(dataStream.w);
  const symbol = dataStream.s?.split("USDT")[0];
  const { imageUrl } = convertSymbolToName(symbol);

  return (
    <>
      <Table className="mt-3 ">
        <TableHeader>
          <TableRow className="text-center grid grid-cols-1 mt-5">
            <TableHead className="flex text-xl text-black">
              <span className="mr-1 mt-1">
                <Image src={imageUrl} alt="" width={20} height={20} />
              </span>
              <span> {capitalizeFirstLetter(name)}</span>
            </TableHead>
            <TableHead>
              <span className="text-3xl font-bold text-black">
                ${newFormatAmount(parseFloat(dataStream.w))}
              </span>
              <span className={valueClassName}>
                {arrowIcon} {parseFloat(dataStream.P)}%
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Market Capitalization</TableCell>
            <TableCell>{formatAmount(marketCap)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              24 Hour Trading Volume
            </TableCell>
            <TableCell>{newFormatAmount(parseFloat(dataStream.q))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">24 Hour High</TableCell>
            <TableCell>{newFormatAmount(parseFloat(dataStream.h))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">24 Hour Low</TableCell>
            <TableCell>{newFormatAmount(parseFloat(dataStream.l))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default StreamComponent;
