"use client";
import React, { Component } from "react";
import { formatDate } from "../(components)/utils/formattingData";
import Loader from "../loader";
import parse from "html-react-parser";

interface Props {
  payload: any;
  isLoading: any;
  error?: any;
}

export default function CommonPage({ payload, isLoading, error }: Props) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="h-screen grid grid-cols-3  mt-20 mb-10 overflow-y-auto">
        <div></div>
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
          <div> {parse(payload?.content || payload?.content_post)}</div>
        </div>
        <div></div>
      </div>
    </>
  );
}
