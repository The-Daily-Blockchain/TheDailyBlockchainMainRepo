"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/app/_components/hooks/useSearch";

const Page = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useSearch(title);

  useEffect(() => {
    if (title) {
      setSearchQuery(title);
    }
  }, [title, setSearchQuery]);

  return (
    <div>
      <h1>Search Results for: {searchQuery}</h1>
      {data?.results.map((x: any) => (
        <div key={x.id}>{x.title}</div>
      ))}
    </div>
  );
};

export default Page;
