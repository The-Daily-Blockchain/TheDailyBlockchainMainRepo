import React from "react";
import Image from "next/image";
import parse from "html-react-parser";

interface Props {
  title?: any;
  data: any;
  handleClick: (x: any) => void;
}

const XlBodyList = ({ title, data, handleClick }: Props) => {
  return (
    <div className="mx-3 overflow-auto">
      <div className="align-center text-center mt-8 text-2xl font-bold">
        {title}
      </div>
      {data?.map?.((x: any, index: any, array: any[]) => (
        <div
          key={x.id}
          className={`mx-1 mt-8 mb-2 border-double ${
            index === array.length - 1 ? "border-b-0" : "border-b-4"
          }`}
        >
          <div
            className="font-bold mb-12 mx-44 hover:cursor-pointer hover:opacity-80"
            onClick={() => handleClick(x)}
          >
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
                  By: {x?.author?.first_name || x?.author_post?.first_name} {""}
                  {x?.author?.last_name || x?.author_post?.last_name}
                </div>
              </div>
            </div>
            <div
              className="mx-10 hover:cursor-pointer hover:opacity-60"
              onClick={() => handleClick(x)}
            >
              {parse(
                (x?.content && x.content.length > 300) ||
                  (x?.content_post && x.content_post.length > 300)
                  ? `${(x?.content || x.content_post).substring(
                      0,
                      300
                    )} <span style="font-weight: bold;"> see more...</span>`
                  : x?.content || x.content_post
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default XlBodyList;
