"use client";
import React from "react";
import Cover from "./xlmainbody/cover";
import MainPage from "./xlmainbody/mainpage";
import useSWR from "swr";
import { fetcher } from "../_components/utils/fetcher";
import Loader from "../loader";
import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";
import MobileScreenAdhoc from "../_adhoc/mobilescreenadhoc";
import LgMainScreenAdhoc from "../_adhoc/lgmainscreenadhoc";
import MdMainScreenAdhoc from "../_adhoc/mdmainscreenadhoc";
import MdCover from "./mdmainbody/MdCover";
import CoverMobileBody from "./mobilemainbody/coverMobileBody";
import MobileMainPage from "./mobilemainbody/mobileMainPage";
import AdHocLoader from "../_adhoc/adhocLoader";
import ArrowButton from "./arrowbutton";

const Body = () => {
  const { data, isLoading } = useSWR("/api/article", fetcher);
  const { isLoading: isLoadingPost } = useSWR("/api/post", fetcher);

  return (
    <>
      <FullScreenAdhoc>
        <AdHocLoader isLoading={isLoading || isLoadingPost}>
          <div className="mx-2">
            <Cover data={data} />
            <MainPage />
          </div>
        </AdHocLoader>
      </FullScreenAdhoc>
      <LgMainScreenAdhoc>
        <AdHocLoader isLoading={isLoading || isLoadingPost}>
          <div className="mx-2">
            <Cover data={data} />
            <MainPage />
          </div>
        </AdHocLoader>
      </LgMainScreenAdhoc>
      <MdMainScreenAdhoc>
        <AdHocLoader isLoading={isLoading || isLoadingPost}>
          <div className="mx-2">
            <MdCover data={data} />
            <MainPage />
          </div>
        </AdHocLoader>
      </MdMainScreenAdhoc>
      <MobileScreenAdhoc>
        <AdHocLoader isLoading={isLoading || isLoadingPost}>
          <div className="mx-2">
            <CoverMobileBody data={data} />
            <div className="h-10 bg-black"></div>
            <MobileMainPage />
          </div>
          <ArrowButton />
        </AdHocLoader>
      </MobileScreenAdhoc>
    </>
  );
};

export default Body;
