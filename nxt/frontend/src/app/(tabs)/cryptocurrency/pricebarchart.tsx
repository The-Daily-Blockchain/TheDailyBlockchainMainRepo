import { formatNumberWithCommas } from "@/app/_components/utils/formatamount";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from "recharts";

const mockData = [{ name: "Price", high: 100, low: 0, current: 100 }];

interface Props {
  data: any;
}

const CustomBar = ({ x, y, width, height, fill, current, low, high }: any) => {
  const grayWidth = 290 * ((high - current) / (high - low));
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

const PriceBarChart = ({ data }: Props) => {
  const width = 300;
  const height = 30;
  return (
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
          dataKey="current"
          radius={[5, 5, 5, 5]}
          shape={<CustomBar />}
          yAxisId={0}
        />
      </BarChart>
      <TableRow noBorder={true} className="grid grid-cols-3">
        <TableCell className="text-left">
          ${formatNumberWithCommas(data[0].low)}
        </TableCell>
        <TableCell className="text-center">24h range</TableCell>
        <TableCell className="text-right">
          ${formatNumberWithCommas(data[0].high)}
        </TableCell>
      </TableRow>
    </>
  );
};

export default PriceBarChart;
