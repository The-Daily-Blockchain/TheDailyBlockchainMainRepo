"use client";
import { convertSymbolToName } from "@/app/_components/utils/convertsymboltoname";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatDate } from "@/app/_components/utils/formattingData";
import { useGetGraph } from "@/app/_components/utils/sevenday";

type TickerData = {
  p: any;
  P: any;
  w: any;
  x: any;
  Q: any;
  b: any;
  B: any;
  a: any;
  A: any;
  O: any;
  C: any;
  F: any;
  L: any;
  n: any;
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
};

const Page = () => {
  const [tickerData, setTickerData] = useState<TickerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const query =
      "btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/solusdt@ticker/xrpusdt@ticker/adausdt@ticker/dogeusdt@ticker/avaxusdt@ticker/dotusdt@ticker/trxusdt@ticker/linkusdt@ticker/maticusdt@ticker/uniusdt@ticker/ltcusdt@ticker";
    const connectWebSocket = () => {
      socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${query}`
      );

      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        const pair = newData.stream.split("@")[0];

        setTickerData((prevData) => {
          const newDataCopy = { ...prevData };
          newDataCopy[pair] = newData.data;

          return newDataCopy;
        });

        setIsLoading(false);
      };

      socket.onclose = () => {
        // Automatically reconnect after 24 hours
        setTimeout(connectWebSocket, 24 * 60 * 60 * 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const data: { [key: string]: { time: any; price: string } } = {};
  Object.values(tickerData).forEach((item: TickerData) => {
    const symbol = item.s.toLowerCase();
    const formattedPrice = parseFloat(item.w).toFixed(2);
    const formattedDate = formatDate(item.E);
    data[symbol] = {
      time: formattedDate,
      price: formattedPrice,
    };
  });

  const symbols: string[] = Object.values(tickerData).map(
    (item: TickerData) => {
      return item.s.toLocaleUpperCase();
    }
  );

  console.log(symbols);
  // symbols.forEach((symbol) => {
  const { data: dataGraph } = useGetGraph(symbols);
  console.log(dataGraph);
  // });

  return (
    <div className="flex min-h-screen m-auto">
      <Table>
        <TableCaption>Powered by Binance.</TableCaption>
        <TableHeader>
          <TableRow className="font-xl">
            <TableHead className="w-[140px]">Cryptocurrency</TableHead>
            <TableHead className="text-right w-[100px]">
              24hr Price change
            </TableHead>
            <TableHead className="text-right w-[100px]">
              24hr Price change %
            </TableHead>
            <TableHead className="text-right w-[100px]">Price</TableHead>
            <TableHead className="text-right w-[100px]">Open Price</TableHead>
            <TableHead className="text-right w-[100px]">Close Price</TableHead>
            <TableHead className="text-right w-[100px]">High 24hr</TableHead>
            <TableHead className="text-right w-[100px]">Low 24hr</TableHead>
            <TableHead className="text-right w-[100px]">Volume USD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(tickerData)
            .sort((pairA: any, pairB: any) => {
              const bidPriceA = parseFloat(tickerData[pairA].q);
              const bidPriceB = parseFloat(tickerData[pairB].q);
              return bidPriceB - bidPriceA;
            })
            .map((pair: any) => (
              <TableRow key={pair}>
                <TableCell className="flex">
                  <Image
                    className="rounded-full mr-2"
                    src={
                      convertSymbolToName(
                        tickerData[pair].s.replace("USDT", "")
                      ).imageUrl
                    }
                    alt={"Symbol"}
                    width={20}
                    height={20}
                  />
                  {
                    convertSymbolToName(tickerData[pair].s.replace("USDT", ""))
                      .name
                  }
                </TableCell>
                <TableCell
                  style={{
                    color: parseFloat(tickerData[pair].p) < 0 ? "red" : "green",
                  }}
                  className="text-right"
                >
                  $ {parseFloat(tickerData[pair].p).toLocaleString()}
                </TableCell>
                <TableCell
                  style={{
                    color: parseFloat(tickerData[pair].P) < 0 ? "red" : "green",
                  }}
                  className="text-right"
                >
                  {parseFloat(tickerData[pair].P).toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(tickerData[pair].w).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(tickerData[pair].o).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(tickerData[pair].c).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(tickerData[pair].h).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(tickerData[pair].l).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(tickerData[pair].q).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <LineChart
                    width={300}
                    height={100}
                    data={[data[pair]]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip label="" />
                    {/* <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="price"
                      name=""
                      stroke="#8884d8"
                    />
                  </LineChart>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
