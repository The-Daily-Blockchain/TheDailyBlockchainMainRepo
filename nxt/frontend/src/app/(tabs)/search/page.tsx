"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/app/_components/hooks/useSearch";
import MainSearchBody from "@/app/_mainbody/searchbody/mainsearchbody";
import Pagination from "@/app/_mainbody/pagination";
import { useDataHandler } from "@/app/_components/utils/dataHandler";

const Page = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [searchQuery, setSearchQuery] = useState("");
  // const { data, isLoading, error } = useSearch(title);
  const apiEndpoint = `/api/search?title=${title}&`;
  useEffect(() => {
    if (title) {
      setSearchQuery(title);
    }
  }, [title, setSearchQuery]);

  const {
    data,
    isLoading,
    error,
    handleDataUpdate,
    handleLoading,
    handleError,
  } = useDataHandler();

  return (
    <>
      <div>
        <h1>Search Results for: {searchQuery}</h1>
      </div>
      <div>
        <MainSearchBody data={data} isLoading={isLoading} error={error} />
      </div>
      <Pagination
        apiEndpoint={apiEndpoint}
        onDataUpdate={handleDataUpdate}
        onLoadingUpdate={handleLoading}
        onErrorUpdate={handleError}
      />
    </>
  );
};

export default Page;
