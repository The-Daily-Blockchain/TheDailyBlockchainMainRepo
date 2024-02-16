"use client";
import useSWR from "swr";
import React from "react";
import { fetcher } from "../_components/utils/fetcher";
import Loader from "../loader";
import { useRouter } from "next/navigation";
import { formatDate } from "../_components/utils/formattingData";
import parse from "html-react-parser";

const RightPage = () => {
  const { data } = useSWR("/api/post", fetcher);
  const router = useRouter();

  return (
    <div className="mr-6">
      <div className="font-bold text-[22px] mb-10">Crypto 101</div>
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
              onClick={() => router.push(`/post/${x.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="text-[22px] font-medium text-[#121212] hover:opacity-50 transition-opacity duration-300">
                {x.title_post}
              </div>
              <div className="text-[#5a5a5a] text-[14px] hover:opacity-50 transition-opacity duration-300 mt-3">
                {parse(
                  x.content_post.length > 400
                    ? `${x.content_post.substring(0, 400)}...`
                    : x.content_post
                )}
              </div>
            </div>
            <div className="mt-4 font-bold">
              By: {x.author_post.first_name} {x.author_post.last_name}
            </div>
            <div className="text-xs">{formatDate(x.time_created_post)}</div>
          </div>
        ))}
    </div>
  );
};

export default RightPage;
