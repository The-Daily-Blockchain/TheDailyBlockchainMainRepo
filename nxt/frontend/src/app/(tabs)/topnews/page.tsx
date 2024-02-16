"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { useDataHandler } from "@/app/_components/utils/dataHandler";
import BodyList from "@/app/_mainbody/BodyList";
import Pagination from "@/app/_mainbody/pagination";

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
