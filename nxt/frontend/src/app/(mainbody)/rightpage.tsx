"use client";
import useSWR from "swr";
import React from "react";
import { fetcher } from "../(components)/utils/fetcher";
import Loader from "../loader";

const RightPage = () => {
  const { data, error, isLoading } = useSWR("/api/post", fetcher);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;
  }
  return (
    <div className="mr-6">
      <div className="font-bold text-[22px] mb-10">Current News</div>
      {data?.results
        ?.filter((post: any) => !post.archived_post)
        .map((x: any) => (
          <div
            key={x.id}
            className="border-b-2 border-solid border-[#121212] mb-8 pb-6"
          >
            <div className="text-[22px] font-medium text-[#121212]">
              {x.title_post}
            </div>
            <div className="text-[#5a5a5a] text-[14px]">{x.content_post}</div>
            <div>
              By: {x?.author_post?.first_name} {x?.author_post?.last_name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RightPage;
