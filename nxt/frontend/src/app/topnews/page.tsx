"use client";
import React, { useState } from "react";
import BodyList from "../(mainbody)/BodyList";
import useSWR from "swr";
import Pagination from "../(mainbody)/pagination";

const Page = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const title = "Top News";
  const apiEndpoint = "/api/article";
  const { isLoading, error } = useSWR(`${apiEndpoint}`);

  const handleDataUpdate = (newData: any) => {
    setData(newData);
  };
  console.log(data);

  return (
    <>
      <BodyList data={data} isLoading={isLoading} error={error} title={title} />
      <Pagination apiEndpoint={apiEndpoint} onDataUpdate={handleDataUpdate} />
    </>
  );
};

export default Page;
