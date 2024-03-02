"use client";
import React, { useState } from "react";
import { useDataHandler } from "@/app/_components/utils/dataHandler";
import BodyList from "@/app/_mainbody/BodyList";

const Page = () => {
  const {
    data,
    isLoading,
    error,
    handleDataUpdate,
    handleLoading,
    handleError,
  } = useDataHandler();
  const title = "Top News";
  const apiEndpoint = "/api/article?";

  return (
    <>
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
    </>
  );
};

export default Page;
