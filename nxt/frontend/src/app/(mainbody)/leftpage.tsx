"use client";
import useSWR from "swr";
import React from "react";
import { fetcher } from "../(components)/utils/fetcher";
import Loader from "../loader";

const LeftPage = () => {
  const { data, error, isLoading } = useSWR("/api/article", fetcher);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;
  }

  return (
    <div className="mr-6">
      <div className="font-bold text-2xl mb-10">Current News LEFT</div>
      {data?.results
        ?.filter((post: any) => !post.archived_post)
        .map((x: any) => (
          <div
            className="border-b-2 border-solid border-[#121212] mb-8 pb-6"
            key={x.id}
          >
            <div className="text-2xl font-medium text-[#121212]">{x.title}</div>
            <div className="text-[#5a5a5a] text-[14px]">{x.content}</div>
            <div>
              By: {x.author.first_name} {x.author.last_name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default LeftPage;
