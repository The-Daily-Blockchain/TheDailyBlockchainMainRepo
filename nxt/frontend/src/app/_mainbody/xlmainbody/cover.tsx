"use client";
import React, { Suspense, useState } from "react";
import RightCover from "../../_navbar/rightCover";
import LeftCover from "../../_navbar/leftCover";

interface Props {
  data: any;
}

const Cover = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 pt-6 border-b-2 mb-12 border-solid border-[#727272]">
      <LeftCover data={data} />
      <RightCover />
    </div>
  );
};

export default Cover;
