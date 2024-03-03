"use client";
import FullScreenAdhoc from "@/app/_adhoc/fullscreenadhoc";
import React from "react";
import XlBodyList from "../xlmainbody/xlBodyList";
import MdScreenAdhoc from "@/app/_adhoc/mdscreenadhoc";
import MdBodyList from "../mdmainbody/mdBodyList";
import MobileScreenAdhoc from "@/app/_adhoc/mobilescreenadhoc";
import LgBodyList from "../lgmainbody/lgBodyList";
import LgScreenAdhoc from "@/app/_adhoc/lgscreenadhoc";
import MobileBodyList from "../mobilemainbody/mobileBodyList";
import Error from "@/app/error";
import { useRouter } from "next/navigation";
import ErrorSearch from "./errorsearch";
import ArrowButton from "../arrowbutton";
import Pagination from "@/app/_mainbody/pagination";

interface Props {
  data: any;
  isLoading: any;
  error: any;
  title?: any;
  apiEndpoint?: any;
  handleDataUpdate?: any;
  handleLoading?: any;
  handleError?: any;
}

const MainSearchBody = ({
  data,
  isLoading,
  error,
  title,
  apiEndpoint,
  handleDataUpdate,
  handleLoading,
  handleError,
}: Props) => {
  const router = useRouter();

  const handleClick = (x: any) => {
    const hasTitle = data?.results?.some((item: { title: any }) => item.title);

    if (hasTitle) {
      router.push(`/search/details/${x.id}/`);
    }
  };

  if (Array.isArray(data) && data.length === 0) {
    return <ErrorSearch title={title} />;
  }
  if (error) return <Error />;
  return (
    <>
      <FullScreenAdhoc>
        <XlBodyList
          data={data}
          handleClick={handleClick}
          isLoading={isLoading}
          title={title}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
        />
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <LgBodyList
          data={data}
          handleClick={handleClick}
          title={title}
          isLoading={isLoading}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
        />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MdBodyList
          data={data}
          handleClick={handleClick}
          title={title}
          isLoading={isLoading}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
        />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileBodyList
          data={data}
          handleClick={handleClick}
          title={title}
          isLoading={isLoading}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
        />
        <ArrowButton />
      </MobileScreenAdhoc>
    </>
  );
};

export default MainSearchBody;
