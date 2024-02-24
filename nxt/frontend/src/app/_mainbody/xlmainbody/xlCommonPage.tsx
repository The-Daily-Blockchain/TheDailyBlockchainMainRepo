import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/app/_components/utils/formattingData";

interface Props {
  payload: any;
}
const XlCommonPage = ({ payload }: Props) => {
  return (
    <div className="h-screen mx-10 mt-20 mb-10 overflow-y-hidden">
      <div>
        <div className="mb-10 font-bold text-xl mx-10">
          {payload?.title || payload?.title_post}
        </div>
        <div>
          By: {payload?.author?.first_name || payload?.author_post?.first_name}{" "}
          {payload?.author?.last_name || payload?.author_post?.last_name}
        </div>

        <div className="mb-10 text-sm">
          {formatDate(payload?.time_created || payload?.time_created_post)}
        </div>
        <div>
          {parse((payload?.content || "") + (payload?.content_post || ""))}
        </div>
      </div>
    </div>
  );
};

export default XlCommonPage;
