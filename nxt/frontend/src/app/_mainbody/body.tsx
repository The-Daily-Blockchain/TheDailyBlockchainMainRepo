"use client";
import React from "react";
import Cover from "../_navbar/cover";
import MainPage from "./mainpage";
import useSWR from "swr";
import { fetcher } from "../_components/utils/fetcher";
import Loader from "../loader";

const Body = () => {
  const { isLoading } = useSWR("/api/article", fetcher);
  const { isLoading: isLoadingPost } = useSWR("/api/post", fetcher);

  if (isLoading || isLoadingPost) {
    return <Loader />;
  }
  return (
    <div className="flex grid-cols-2">
      <div className="w-2/12 bg-black">BANNER</div>
      <div className="w-10/12">
        <Cover />
        <MainPage />
      </div>
    </div>
  );
};

export default Body;
