import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import { fetcher } from "@/app/_components/utils/fetcher";
import React from "react";
import useSWR from "swr";
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

const StreamComponent = ({ params, name }: any) => {
  const { data: marketCap } = useFetchMarketCap(name);

  const { data: dataStream } = useCryptoStream(params) as { data: any };

  const { arrowIcon, valueClassName } = useValueArrow(dataStream.w);

  //   const { imageUrl } = convertSymbolToName(data);
  return (
    <>
      <Table className="mt-3 ">
        <TableHeader>
          <TableRow className="text-center grid grid-cols-1 mt-5">
            <TableHead className="text-xl text-black">
              {capitalizeFirstLetter(name)}
            </TableHead>
            <TableHead>
              <span className="text-3xl font-bold text-black">
                ${newFormatAmount(parseFloat(dataStream.w))}
              </span>
              <span className={valueClassName}>
                {arrowIcon} {parseFloat(dataStream.p)}%
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
