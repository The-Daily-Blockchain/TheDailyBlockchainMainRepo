"use client";
import React from "react";
import BodyList from "../../_mainbody/BodyList";
import Pagination from "../../_mainbody/pagination";
import { useDataHandler } from "../../_components/utils/dataHandler";

const Page = () => {
  const {
    data,
    isLoading,
    error,
    handleDataUpdate,
    handleLoading,
    handleError,
  } = useDataHandler();
  const title = "Crypto 101";
  const apiEndpoint = "/api/post?";

  return (
    <div>
      <BodyList
        data={data}
        isLoading={isLoading}
        error={error}
        title={title}
        apiEndpoint={apiEndpoint}
        handleDataUpdate={handleDataUpdate}
        handleLoading={handleLoading}
        handleError={handleError}
      />
    </div>
  );
};

export default Page;
