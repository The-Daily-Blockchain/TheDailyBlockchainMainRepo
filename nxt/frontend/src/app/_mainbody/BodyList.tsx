"use client";
import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Loader from "../loader";
import Error from "../error";
import { useRouter } from "next/navigation";
import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";

interface Props {
  data: any;
  isLoading?: any;
  error?: any;
  title?: any;
}

const BodyList = ({ data, isLoading, error, title }: Props) => {
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }
  if (error) return <Error />;
  console.log(data);

  return (
    <FullScreenAdhoc>
      <div className="mx-3 overflow-auto">
        <div className="align-center text-center mt-8 text-2xl font-bold">
          {title}
        </div>
        {data?.map?.((x: any) => (
          <div key={x.id} className="mx-1 mt-8 border-double border-b-4 mb-2 ">
            <div className="font-bold mb-12 mx-24">
              {x.title || x.title_post}
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-start">
                  <Image
                    width={300}
                    height={300}
                    alt="toparticlepic"
                    src={x.image || x.image_post}
                  />

                  <div className="my-4">
                    By: {x?.author?.first_name || x?.author_post?.first_name}{" "}
                    {""}
                    {x?.author?.last_name || x?.author_post?.last_name}
                  </div>
                </div>
              </div>
              <div
                className="mx-10 hover:cursor-pointer hover:opacity-60"
                onClick={() => {
                  const hasTitle = data?.some((x: { title: any }) => x.title);
                  const hasTitlePost = data?.some(
                    (x: { title_post: any }) => x.title_post
                  );

                  if (hasTitle) {
                    router.push(`/article/${x.id}`);
                  } else if (hasTitlePost) {
                    router.push(`/post/${x.id}`);
                  }
                }}
              >
                {parse(
                  (x?.content && x.content.length > 300) ||
                    (x?.content_post && x.content_post.length > 300)
                    ? `${(x?.content || x.content_post).substring(0, 300)}...`
                    : x?.content || x.content_post
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </FullScreenAdhoc>
  );
};

export default BodyList;
