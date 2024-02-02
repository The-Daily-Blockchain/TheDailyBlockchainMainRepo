"use client";
import React from "react";
import Cover from "../(navbar)/cover";
import MainPage from "./mainpage";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";
import Loader from "../loader";

const Body = () => {
  const { isLoading } = useSWR("/api/article", fetcher);
  const { isLoading: isLoadingPost } = useSWR("/api/post", fetcher);

  if (isLoading || isLoadingPost) {
    return <Loader />;
  }
  return (
    <div>
      <Cover />
      <MainPage />
    </div>
  );
};

export default Body;
