"use client";
import React from "react";
import BodyList from "../(mainbody)/BodyList";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";
import Pagination from "../(mainbody)/pagination";
import { useDataHandler } from "../(components)/utils/dataHandler";

const Page = () => {
  const { data, handleDataUpdate } = useDataHandler();
  const title = "Crypto 101";
  const apiEndpoint = "/api/post";
  const { isLoading, error } = useSWR(`${apiEndpoint}`);
  return (
    <div>
      <BodyList data={data} isLoading={isLoading} error={error} title={title} />
      <Pagination apiEndpoint={apiEndpoint} onDataUpdate={handleDataUpdate} />
    </div>
  );
};

export default Page;
