"use client";
import React from "react";
import RightCover from "./rightCover";
import LeftCover from "./leftCover";

const Cover = () => {
  return (
    <div className="grid grid-cols-2 mt-10">
      <LeftCover />
      <RightCover />
    </div>
  );
};

export default Cover;
