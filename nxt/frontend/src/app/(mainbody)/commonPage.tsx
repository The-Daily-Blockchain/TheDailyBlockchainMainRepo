"use client";
import React from "react";
interface Props {
  payload: any;
  isLoading: any;
  error: any;
}

export default function CommonPage({ payload, isLoading, error }: Props) {
  console.log(payload);
  return (
    <>
      <div>
        <div>{payload?.title}</div>
        <div>{payload?.content}</div>
      </div>
    </>
  );
}
