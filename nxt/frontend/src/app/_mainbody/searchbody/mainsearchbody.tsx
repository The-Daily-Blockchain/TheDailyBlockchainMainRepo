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
import Loader from "@/app/loader";
import Error from "@/app/error";
import { useRouter } from "next/navigation";

interface Props {
  data: any;
  isLoading: any;
  error: any;
  title?: any;
}

const MainSearchBody = ({ data, isLoading, error, title }: Props) => {
  const router = useRouter();

  const handleClick = (x: any) => {
    const hasTitle = data?.some((item: { title: any }) => item.title);

    if (hasTitle) {
      router.push(`/search/details/${x.id}/`);
    }
  };

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
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <LgBodyList
          data={data}
          handleClick={handleClick}
          title={title}
          isLoading={isLoading}
        />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MdBodyList
          data={data}
          handleClick={handleClick}
          title={title}
          isLoading={isLoading}
        />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileBodyList
          data={data}
          handleClick={handleClick}
          title={title}
          isLoading={isLoading}
        />
      </MobileScreenAdhoc>
    </>
  );
};

export default MainSearchBody;
