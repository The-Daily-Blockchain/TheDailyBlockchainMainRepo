"use client";
import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Loader from "../loader";
import Error from "../error";
import { useRouter } from "next/navigation";

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
    <div className="grid grid-cols-[1fr,3fr,1fr] ">
      <div className="bg-black">1</div>
      <div className="mx-3 overflow-auto">
        <div className="align-center text-center mt-8 text-2xl font-bold">
          {title}
        </div>
        {data?.map?.((x: any) => (
          <div key={x.id} className="mx-1 mt-8 border-b-2 mb-2 ">
            <div className="font-bold mb-3">{x.title || x.title_post}</div>
            <div className="flex">
              <div>
                <Image
                  width={500}
                  height={500}
                  alt="toparticlepic"
                  src={x.image || x.image_post}
                />
              </div>
              <div
                className="mx-10 hover:cursor-pointer hover:opacity-60"
                onClick={() => {
                  const hasTitle = data?.results?.some(
                    (x: { title: any }) => x.title
                  );
                  const hasTitlePost = data?.results?.some(
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
            <div className="my-2 mb-3">
              By: {x?.author?.first_name || x?.author_post?.first_name} {""}
              {x?.author?.last_name || x?.author_post?.last_name}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black">3</div>
    </div>
  );
};

export default BodyList;
