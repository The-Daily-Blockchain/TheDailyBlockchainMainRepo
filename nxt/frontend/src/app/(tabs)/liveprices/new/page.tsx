"use client";
import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from "recharts";
import dynamic from "next/dynamic";

const mockData = [{ name: "Price", high: 100, low: 0, current: 50 }];

// const DynamicPage = dynamic(
//   () => import("@/app/(tabs)/liveprices/new/page").then((mod) => mod.default),
//   {
//     ssr: false,
//   }
// );
// const NoSSR = dynamic(() => import("@/app/(tabs)/liveprices/new/page"), {
//   ssr: false,
// });
// bobo sa ibang component pala to

const CustomBar = ({ x, y, width, height, fill, current, low, high }: any) => {
  const grayWidth = 300 * ((high - current) / (high - low));
  const greenWidth = 300 - grayWidth;

  return (
    <g>
      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="100%" stopColor="#82ca9d" />
        <stop offset="0%" stopColor="#8dd1e1" />
      </linearGradient>
      <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff6666" />
        <stop offset="100%" stopColor="#ffcccc" />
      </linearGradient>
      <rect
        x={x}
        y={y}
        width={greenWidth}
        height={height}
        fill="url(#gradient)"
      />
      <rect
        x={x + greenWidth}
        y={y}
        width={grayWidth}
        height={height}
        fill="url(#gradientRed)"
      />
    </g>
  );
};

const Page = () => {
  const { high, low, current } = mockData[0];
  const width = 300;
  const height = 30;
  return (
    <div>
      {/* <DynamicPage /> */}
      <BarChart width={width} height={height} data={mockData} layout="vertical">
        <defs></defs>
        <CartesianGrid stroke="none" />
        <YAxis hide type="category" dataKey="name" />
        <XAxis hide type="number" domain={[low, high]} />
        <Bar dataKey="current" radius={[5, 5, 5, 5]} shape={<CustomBar />} />
        <Tooltip />
      </BarChart>
      {/* <NoSSR /> */}
    </div>
  );
};

export default Page;
