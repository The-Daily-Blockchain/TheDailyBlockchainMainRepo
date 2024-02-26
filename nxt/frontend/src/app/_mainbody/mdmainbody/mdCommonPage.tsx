import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/app/_components/utils/formattingData";

interface Props {
  payload: any;
}
const MdCommonPage = ({ payload }: Props) => {
  return (
    <div className="h-screen mx-6 mt-10 mb-10 overflow-y-hidden">
      <div>
        <div className="mb-10 font-bold text-lg">
          {payload?.title || payload?.title_post}
        </div>
        <div className="text-sm">
          By: {payload?.author?.first_name || payload?.author_post?.first_name}{" "}
          {payload?.author?.last_name || payload?.author_post?.last_name}
        </div>

        <div className="mb-10 text-xs">
          {formatDate(payload?.time_created || payload?.time_created_post)}
        </div>
        <div className="mb-10 text-sm">
          {parse((payload?.content || "") + (payload?.content_post || ""))}
        </div>
      </div>
    </div>
  );
};

export default MdCommonPage;
