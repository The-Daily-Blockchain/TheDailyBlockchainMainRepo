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
import { formatAmount } from "@/app/_components/utils/formatamount";

const StreamComponent = ({ params, name }: any) => {
  const { data: marketCap } = useFetchMarketCap(name);
  console.log(marketCap);
  console.log(name);
  //   console.log(data.name.usd_market_cap);
  //   const { data } = useCryptoStream(params);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              {capitalizeFirstLetter(name)}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">$21321321</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Market Capitalization</TableCell>
            <TableCell>{formatAmount(marketCap)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
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
