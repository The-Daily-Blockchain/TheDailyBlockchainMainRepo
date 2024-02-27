"use client";
import React, { useEffect } from "react";
import { useSearch } from "@/app/_components/hooks/useSearch";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import SearchComponent from "@/app/_navbar/searchingcomponent/searchcomponent";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const { title } = useParams();
  const title = searchParams.get("title");
  const { data, isLoading, error, mutate } = useSearch(title);
  console.log("asdasd");

  return (
    <>
      <div>
        {data?.results.map((x: any) => (
          <div key={x.id}>{x.title}</div>
        ))}
      </div>
    </>
  );
};

export default Page;
