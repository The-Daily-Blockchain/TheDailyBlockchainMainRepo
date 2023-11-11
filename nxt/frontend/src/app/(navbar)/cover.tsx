"use client";
import React from "react";
import RightCover from "./rightCover";
import LeftCover from "./leftCover";

const Cover = () => {
  return (
    <div className="grid grid-cols-2 pt-6 border-t-4 border-[#000]">
      <LeftCover />
      <RightCover />
    </div>
  );
};

export default Cover;
