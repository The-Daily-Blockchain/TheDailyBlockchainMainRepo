"use client";
import React, { Suspense, useState } from "react";
import RightCover from "./rightCover";
import LeftCover from "./leftCover";

const Cover = () => {
  return (
    <div className="grid grid-cols-2 pt-6 border-b-2 mb-12 border-solid border-[#727272]">
      <LeftCover />
      <RightCover />
    </div>
  );
};

export default Cover;
