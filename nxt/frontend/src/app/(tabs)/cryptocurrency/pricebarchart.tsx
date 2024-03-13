import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from "recharts";

const mockData = [{ name: "Price", high: 100, low: 0, current: 100 }];

interface Props {
  data: any;
}

const PriceBarChart = ({ data }: Props) => {
  console.log("data", data);

  const adjustedData = data?.map?.((item: any) => ({
    ...item,
    high: item.high,
    low: item.low,
    current: item.current !== item.low ? item.current - item.low : item.current,
  }));

  return (
    <BarChart width={350} height={25} data={adjustedData} layout="vertical">
      <CartesianGrid stroke="none" />
      <XAxis hide type="number" />
      <YAxis hide type="category" dataKey="name" />
      <Bar dataKey="current" fill="url(#gradient)" stackId="a" />
      <Bar dataKey="high" fill="#d3d3d3" stackId="a" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8884d8" />
          <stop offset="100%" stopColor="#82ca9d" />
        </linearGradient>
      </defs>
    </BarChart>
  );
};

export default PriceBarChart;
