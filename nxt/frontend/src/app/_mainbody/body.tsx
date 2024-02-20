"use client";
import React from "react";
import Cover from "../_navbar/cover";
import MainPage from "./mainpage";
import useSWR from "swr";
import { fetcher } from "../_components/utils/fetcher";
import Loader from "../loader";
import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";

const Body = () => {
  const { isLoading } = useSWR("/api/article", fetcher);
  const { isLoading: isLoadingPost } = useSWR("/api/post", fetcher);

  if (isLoading || isLoadingPost) {
    return <Loader />;
  }
  return (
    <FullScreenAdhoc>
      <div className="mx-2">
        <Cover />
        <MainPage />
      </div>
    </FullScreenAdhoc>
  );
};

export default Body;
