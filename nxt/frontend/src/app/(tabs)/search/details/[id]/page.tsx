"use client";
import { fetcher } from "@/app/_components/utils/fetcher";
import CommonPage from "@/app/_mainbody/commonPage";
import React from "react";
import useSWR from "swr";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useSWR(
    `/api/search/details/${params.id}`,
    fetcher
  );

  return (
    <>
      <CommonPage payload={data} isLoading={isLoading} error={error} />
    </>
  );
};

export default Page;
