"use client";
import React, { Suspense, useState } from "react";
import RightCover from "../../_navbar/rightCover";
import MdLeftCover from "@/app/_navbar/mdfolder/mdLeftCover";

interface Props {
  data: any;
}

const MdCover = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 pt-6 border-b-2 mb-12 border-solid border-[#727272]">
      <MdLeftCover data={data} />
      <RightCover />
    </div>
  );
};

export default MdCover;
