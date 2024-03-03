import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Loader from "@/app/loader";
import { formatDate } from "@/app/_components/utils/formattingData";
interface Props {
  title?: any;
  data: any;
  handleClick: (x: any) => void;
  isLoading?: any;
}

const MobileBodyList = ({ title, data, handleClick, isLoading }: Props) => {
  if (isLoading) return <Loader />;
  return (
    <div className="mx-3 overflow-auto">
      <div className="align-center text-center mt-8 text-2xl font-bold">
        {title}
      </div>
      {data?.results?.map?.((x: any, index: any, array: any[]) => (
        <div
          key={x.id}
          className={`mx-1 mt-8 mb-2 border-double ${
            index === array.length - 1 ? "border-b-0" : "border-b-4"
          }`}
        >
          <div
            className="font-bold mb-12 hover:cursor-pointer hover:opacity-80"
            onClick={() => handleClick(x)}
          >
            {x.title || x.title_post}
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-start">
                <Image
                  width={250}
                  height={250}
                  alt="toparticlepic"
                  src={x.image || x.image_post}
                />

                <div className="mt-4 font-bold">
                  By: {x?.author?.first_name || x?.author_post?.first_name} {""}
                  {x?.author?.last_name || x?.author_post?.last_name}
                </div>
                <div className="mb-4 text-sm">{formatDate(x.time_created)}</div>
              </div>
            </div>
            <div
              className="ml-3 hover:cursor-pointer hover:opacity-60 overflow-x-hidden"
              onClick={() => handleClick(x)}
            >
              {parse(
                (x?.content && x.content.length > 50) ||
                  (x?.content_post && x.content_post.length > 50)
                  ? `${(x?.content || x.content_post).substring(
                      0,
                      50
                    )}<span className="hover:underline hover:opacity-80" style="font-weight: bold;"> see more...</span>`
                  : x?.content || x.content_post
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MobileBodyList;
