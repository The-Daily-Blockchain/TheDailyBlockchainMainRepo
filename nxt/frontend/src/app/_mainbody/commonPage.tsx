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
import ArrowButton from "./arrowbutton";

interface Props {
  payload: any;
  isLoading: any;
  error?: any;
}

export default function CommonPage({ payload, isLoading, error }: Props) {
  if (error) {
    return <Error />;
  }
  return (
    <>
      <FullScreenAdhoc>
        <XlCommonPage payload={payload} error={error} isLoading={isLoading} />
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <LgCommonPage payload={payload} error={error} isLoading={isLoading} />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MdCommonPage payload={payload} error={error} isLoading={isLoading} />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileCommonPage
          payload={payload}
          error={error}
          isLoading={isLoading}
        />
        <ArrowButton />
      </MobileScreenAdhoc>
    </>
  );
}
