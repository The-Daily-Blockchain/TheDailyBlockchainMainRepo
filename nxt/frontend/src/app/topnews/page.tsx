"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";
import Image from "next/image";
import parse from "html-react-parser";

const page = () => {
  const { data } = useSWR("/api/article", fetcher);
  console.log(data);
  return (
    <div className="h-screen overflow-auto grid grid-cols-[1fr,3fr,1fr]">
      <div className="bg-black">1</div>
      <div>
        {data?.results?.map?.((x: any) => (
          <div key={x.id} className="mx-1 mt-8">
            <div className="font-bold">{x.title}</div>
            <div className="flex">
              <div>
                <Image
                  width={500}
                  height={500}
                  alt="toparticlepic"
                  src={x.image}
                />
              </div>
              <div className="mx-10">
                {parse(
                  x.content.length > 200
                    ? `${x.content.substring(0, 200)}...`
                    : x.content
                )}
              </div>
            </div>
            <div>
              By: {x.author.first_name} {x.author.last_name}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black">3</div>
    </div>
  );
};

export default page;
