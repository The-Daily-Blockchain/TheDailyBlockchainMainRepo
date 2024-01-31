"use client";
import React, { Component } from "react";
import { formatDate } from "../(components)/utils/formattingData";

interface Props {
  payload: any;
  isLoading: any;
  error?: any;
}

export default function CommonPage({ payload, isLoading, error }: Props) {
  return (
    <>
      <div className="h-screen">
        <div className="mb-10">{payload?.title || payload?.title_post}</div>
        <div>
          By: {payload?.author?.first_name || payload?.author_post?.first_name}{" "}
          {payload?.author?.last_name || payload?.author_post?.last_name}
        </div>
        <div>
          {formatDate(payload?.time_created || payload?.time_created_post)}
        </div>
        <div>{payload?.content}</div>
      </div>
    </>
  );
}
