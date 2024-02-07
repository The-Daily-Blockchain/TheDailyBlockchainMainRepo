"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";

const page = () => {
  const { data } = useSWR("/api/article", fetcher);
  console.log(data);
  return (
    <div className="h-screen overflow-auto">
      {data?.results?.map?.((x: any) => (
        <div key={x.id}>
          <div className="font-bold">{x.title}</div>
          <div>
            {x.content.length > 400
              ? `${x.content.substring(0, 400)}...`
              : x.content}
          </div>
          <div>
            {x.author.first_name} {x.author.last_name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
