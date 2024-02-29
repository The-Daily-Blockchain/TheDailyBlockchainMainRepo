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
const MdCommonPage = ({ payload, isLoading, error }: Props) => {
  if(error) return <Error />
  if(isLoading) return <Loader />
  return (
    <div className="min-h-screen mx-6 mt-10 mb-10 overflow-y-hidden">
      <div  className="flex-grow overflow-auto">
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
