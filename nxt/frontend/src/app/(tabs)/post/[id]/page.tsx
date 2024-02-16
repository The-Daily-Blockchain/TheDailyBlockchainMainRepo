"use client";
import React from "react";
import CommonPage from "../../../_mainbody/commonPage";
import useSWR from "swr";
import { fetcher } from "../../../_components/utils/fetcher";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: dataDetails,
    error: errorDetails,
    isLoading: isLoadingDetails,
  } = useSWR(`/api/post/details/${params.id}`, fetcher);

  return (
    <div>
      <CommonPage
        payload={dataDetails}
        isLoading={isLoadingDetails}
        error={errorDetails}
      />
    </div>
  );
}
