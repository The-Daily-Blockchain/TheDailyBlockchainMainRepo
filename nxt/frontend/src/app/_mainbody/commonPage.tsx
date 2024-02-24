"use client";
import React, { Component } from "react";

import Loader from "../loader";

import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";
import Error from "../error";
import XlCommonPage from "./xlmainbody/xlCommonPage";
import LgScreenAdhoc from "../_adhoc/lgscreenadhoc";
import LgCommonPage from "./lgmainbody/lgCommonPage";
import MdCommonPage from "./mdmainbody/mdCommonPage";
import MobileCommonPage from "./mobilemainbody/mobileCommonPage";
import MdScreenAdhoc from "../_adhoc/mdscreenadhoc";
import MobileScreenAdhoc from "../_adhoc/mobilescreenadhoc";

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
      <LgScreenAdhoc>
        <LgCommonPage payload={payload} />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MdCommonPage payload={payload} />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileCommonPage payload={payload} />
      </MobileScreenAdhoc>
    </>
  );
}
