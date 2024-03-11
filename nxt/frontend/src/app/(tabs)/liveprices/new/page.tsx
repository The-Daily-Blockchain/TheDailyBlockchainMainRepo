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
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { formatDate } from "@/app/_components/utils/formattingData";
import { useGetGraph } from "@/app/_components/utils/sevenday";
import { useDebouncedValue } from "@/app/_components/utils/usedebouncevalue";
import { useWebSocket } from "./usewebsocket";
import Loader from "@/app/loader";

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
  const { tickerData, isLoading } = useWebSocket();

  const dataGraph = useGetGraph();

  const formattedData = Object.entries(dataGraph.data).reduce<{
    [symbol: string]: { time: string; price: any }[];
  }>((result, [symbol, dataArray]) => {
    if (Array.isArray(dataArray)) {
      const formattedSymbolData = dataArray.map((dataPoint: any[]) => ({
        time: new Date(dataPoint[6]).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        price: dataPoint[4],
      }));
      result[symbol] = formattedSymbolData;
    }
    return result;
  }, {});

  const getPriceChangeColor = (data: any[]): string => {
    if (data.length < 2) {
      return "#8884d8";
    }
    const currentPrice = parseFloat(data[data.length - 1].price);
    const previousPrice = parseFloat(data[data.length - 2].price);
    return currentPrice > previousPrice ? "green" : "red";
  };

  if (isLoading && !dataGraph.data) return <Loader />;

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
                  {/* <LineChart
                    width={300}
                    height={120}
                    data={formattedData[pair] || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis width={80} height={200} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                      name="7 day price change"
                      type="monotone"
                      dataKey="price"
                      stroke={getPriceChangeColor(formattedData[pair] || [])}
                    />
                  </LineChart> */}
                  <AreaChart
                    width={260}
                    height={120}
                    data={formattedData[pair] || []}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="10%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="90%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={getPriceChangeColor(formattedData[pair] || [])}
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
