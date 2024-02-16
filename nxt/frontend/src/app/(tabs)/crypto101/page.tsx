"use client";
import React from "react";
import BodyList from "../../_mainbody/BodyList";
import useSWR from "swr";
import Pagination from "../../_mainbody/pagination";
import { useDataHandler } from "../../_components/utils/dataHandler";

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
