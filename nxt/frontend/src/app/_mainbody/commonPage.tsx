"use client";
import React, { Component } from "react";
import { formatDate } from "../_components/utils/formattingData";
import Loader from "../loader";
import parse from "html-react-parser";
import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";
import Error from "../error";

interface Props {
  payload: any;
  isLoading: any;
  error?: any;
}

export default function CommonPage({ payload, isLoading, error }: Props) {
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <FullScreenAdhoc>
        <div className="h-screen mx-10 mt-20 mb-10 overflow-y-hidden">
          <div>
            <div className="mb-10 font-bold text-xl">
              {payload?.title || payload?.title_post}
            </div>
            <div>
              By:{" "}
              {payload?.author?.first_name || payload?.author_post?.first_name}{" "}
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
      </FullScreenAdhoc>
    </>
  );
}
