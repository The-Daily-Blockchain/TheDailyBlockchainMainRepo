"use client";
import React, { useState } from "react";
import BodyList from "../(mainbody)/BodyList";
import useSWR from "swr";
import Pagination from "../(mainbody)/pagination";
import { useDataHandler } from "../(components)/utils/dataHandler";

const Page = () => {
  const { data, handleDataUpdate } = useDataHandler();
  const title = "Top News";
  const apiEndpoint = "/api/article";
  const { isLoading, error } = useSWR(`${apiEndpoint}`);

  return (
    <>
      <BodyList data={data} isLoading={isLoading} error={error} title={title} />
      <Pagination apiEndpoint={apiEndpoint} onDataUpdate={handleDataUpdate} />
    </>
  );
};

export default Page;
