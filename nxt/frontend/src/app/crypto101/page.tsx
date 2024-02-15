"use client";
import React from "react";
import BodyList from "../(mainbody)/BodyList";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";
import Pagination from "../(mainbody)/pagination";

const Page = () => {
  const title = "Crypto 101";
  const { data, isLoading, error } = useSWR("/api/post", fetcher);
  return (
    <div>
      <BodyList data={data} isLoading={isLoading} error={error} title={title} />
    </div>
  );
};

export default Page;
