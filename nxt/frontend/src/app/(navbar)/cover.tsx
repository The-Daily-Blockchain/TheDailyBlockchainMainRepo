"use client";
import React, { Suspense, useState } from "react";
import RightCover from "./rightCover";
import LeftCover from "./leftCover";
import Loading from "./loading";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";

const Cover = () => {
  const { isLoading } = useSWR("/api/article", fetcher);
  const { isLoading: isLoadingPost } = useSWR("/api/post", fetcher);

  if (isLoading && isLoadingPost) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-2 pt-6 border-b-2 mb-12 border-solid border-[#727272]">
      <LeftCover />
      <RightCover />
    </div>
  );
};

export default Cover;
