"use client";
import React, { Component } from "react";
import { formatDate } from "../(components)/utils/formattingData";

interface Props {
  payload: any;
  isLoading: any;
  error: any;
}

export default function CommonPage({ payload, isLoading, error }: Props) {
  return (
    <>
      <div>
        <div className="mb-10">{payload?.title}</div>
        <div>
          By: {payload?.author?.first_name} {payload?.author?.last_name}
        </div>
        <div>{formatDate(payload?.time_created)}</div>
        <div>{payload?.content}</div>
      </div>
    </>
  );
}
