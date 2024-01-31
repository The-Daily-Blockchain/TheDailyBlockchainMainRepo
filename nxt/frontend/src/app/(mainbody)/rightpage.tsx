"use client";
import useSWR from "swr";
import React from "react";
import { fetcher } from "../(components)/utils/fetcher";
import Loader from "../loader";
import { useRouter } from "next/navigation";

const RightPage = () => {
  const { data, error, isLoading } = useSWR("/api/post", fetcher);
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;
  }
  return (
    <div className="mr-6">
      <div className="font-bold text-[22px] mb-10">Current events</div>
      {data?.results
        ?.filter((post: any) => !post.archived_post)
        .map((x: any, index: number) => (
          <div
            key={x.id}
            className={`mb-8 pb-6 ${
              index === data.results.length - 1
                ? ""
                : "border-b-2 border-solid border-[#121212]"
            }`}
          >
            <div
              className="text-[22px] font-medium text-[#121212]"
              onClick={() => router.push(`/post/${x.id}`)}
              style={{ cursor: "pointer" }}
            >
              {x.title_post}
            </div>
            <div className="text-[#5a5a5a] text-[14px]">
              {x.content_post.length > 400
                ? `${x.content_post.substring(0, 400)}...`
                : x.content_post}
            </div>
            <div>
              By: {x?.author_post?.first_name} {x?.author_post?.last_name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RightPage;
