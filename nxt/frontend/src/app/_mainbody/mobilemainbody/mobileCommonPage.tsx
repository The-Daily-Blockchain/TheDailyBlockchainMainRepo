import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/app/_components/utils/formattingData";

interface Props {
  payload: any;
}

const MobileCommonPage = ({ payload }: Props) => {
  return (
    <div className="mx-2 mt-10 mb-10">
      <div>
        <div className="pb-10 mb- 20 font-bold text-lg">
          {payload?.title || payload?.title_post}
        </div>
        <div className="text-xs">
          By: {payload?.author?.first_name || payload?.author_post?.first_name}{" "}
          {payload?.author?.last_name || payload?.author_post?.last_name}
        </div>

        <div className="mb-10 text-xs">
          {formatDate(payload?.time_created || payload?.time_created_post)}
        </div>
        <div className="text-sm">
          {parse((payload?.content || "") + (payload?.content_post || ""))}
        </div>
      </div>
    </div>
  );
};

export default MobileCommonPage;
