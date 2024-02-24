"use client";
import React, { Component } from "react";

import Loader from "../loader";

import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";
import Error from "../error";
import XlCommonPage from "./xlmainbody/xlCommonPage";

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
        <XlCommonPage payload={payload} />
      </FullScreenAdhoc>
    </>
  );
}
