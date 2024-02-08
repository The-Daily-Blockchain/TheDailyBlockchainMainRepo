"use client";
import React from "react";
import BodyList from "../(mainbody)/BodyList";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";

const Page = () => {
  const title = "Top News";
  const { data, isLoading, error } = useSWR("/api/article", fetcher);
  return (
    <>
      <BodyList data={data} isLoading={isLoading} error={error} title={title} />
    </>
  );
};

export default Page;
