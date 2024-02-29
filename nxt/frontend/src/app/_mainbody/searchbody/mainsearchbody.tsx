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
}

const MainSearchBody = ({ data, isLoading, error }: Props) => {
  const router = useRouter();

  const handleClick = (x: any) => {
    const hasTitle = data?.some((item: { title: any }) => item.title);

    if (hasTitle) {
      router.push(`/search/details/${x.id}/`);
    }
  };

  if (isLoading) return <Loader />;

  if (error) return <Error />;
  return (
    <>
      <FullScreenAdhoc>
        <XlBodyList data={data} handleClick={handleClick} />
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <LgBodyList data={data} handleClick={handleClick} />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MdBodyList data={data} handleClick={handleClick} />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileBodyList data={data} handleClick={handleClick} />
      </MobileScreenAdhoc>
    </>
  );
};

export default MainSearchBody;
