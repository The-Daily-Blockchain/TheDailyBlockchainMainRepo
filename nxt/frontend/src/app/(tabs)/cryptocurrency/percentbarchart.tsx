import { Table, TableCell, TableRow } from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from "recharts";

const mockData = [{ name: "Price", high: 100, low: 0, current: 100 }];

interface Props {
  data?: any;
}
const low = 0;

const CustomBar = ({
  x,
  y,
  height,
  fill,
  cir_supply,
  base,
  total_supply,
}: any) => {
  const grayWidth = 290 * ((total_supply - cir_supply) / (total_supply - base));
  const greenWidth = 290 - grayWidth;

  return (
    <g>
      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8dd1e1" />
        <stop offset="20%" stopColor="#7ec5d7" />
        <stop offset="40%" stopColor="#70b9cd" />
        <stop offset="60%" stopColor="#61adc4" />
        <stop offset="80%" stopColor="#5391b1" />
        <stop offset="100%" stopColor="#4a7b9f" />
      </linearGradient>
      <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff6666" />
        <stop offset="20%" stopColor="#ff7a7a" />
        <stop offset="40%" stopColor="#ff8e8e" />
        <stop offset="60%" stopColor="#ffa2a2" />
        <stop offset="80%" stopColor="#ffbbbb" />
        <stop offset="100%" stopColor="#ffcccc" />
      </linearGradient>
      <rect
        x={x || ""}
        y={y}
        width={greenWidth || ""}
        height={height}
        fill="url(#gradient)"
      />
      <rect
        x={x + greenWidth || ""}
        y={y}
        width={grayWidth || ""}
        height={height}
        fill="url(#gradientRed)"
      />
    </g>
  );
};

const PercentBarChart = ({ data }: any) => {
  const width = 300;
  const height = 20;
  return (
    <>
      <>
        <BarChart
          width={width || ""}
          height={height}
          data={data}
          layout="vertical"
        >
          <CartesianGrid stroke="none" />
          <YAxis hide type="category" dataKey="name" />
          <Bar
            dataKey="cir_supply"
            radius={[5, 5, 5, 5]}
            shape={<CustomBar />}
          />
        </BarChart>
        <TableRow className="relative" noBorder={true}>
          <TableCell className="flex absolute -top-3 left-32">
            <span className="font-bold text-xs">
              {(
                (parseFloat(data[0].cir_supply) /
                  parseFloat(data[0].total_supply)) *
                100
              ).toFixed(2)}
              %
            </span>
            <span className="ml-1 mt-[2px] delay-100">
              <HoverCard openDelay={300}>
                <HoverCardTrigger className="cursor-pointer">
                  <IoInformationCircleOutline className="text-gray-600" />
                </HoverCardTrigger>
                <HoverCardContent side="top">
                  This depicts the percentage of circulating supply compared to
                  the total supply of a cryptocurrency, offering investors a
                  clear representation of the available market liquidity and the
                  potential impact on its value dynamics.
                </HoverCardContent>
              </HoverCard>
            </span>
          </TableCell>
        </TableRow>
      </>
    </>
  );
};

export default PercentBarChart;
