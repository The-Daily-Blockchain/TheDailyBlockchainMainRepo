import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/app/_components/utils/formattingData";
import Loader from "@/app/loader";
import Error from "@/app/error";


interface Props {
  payload: any;
  isLoading?: boolean;
  error?: boolean;
}

const MobileCommonPage = ({ payload, isLoading, error  }: Props) => {
  if(isLoading) return <Loader />
  if(error) return <Error />
  return (
    <div className="min-h-screen mx-2 mt-10 mb-10">
      <div className="flex-grow overflow-auto">
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
