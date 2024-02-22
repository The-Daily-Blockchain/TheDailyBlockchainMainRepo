"use client";
import React from "react";
import Loader from "../loader";
import Error from "../error";
import { useRouter } from "next/navigation";
import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";
import LgBodyList from "./_lgmainbody/lgBodyList";
import XlBodyList from "./_xlmainbody/xlBodyList";
import LgScreenAdhoc from "../_adhoc/lgscreenadhoc";
import MdScreenAdhoc from "../_adhoc/mdscreenadhoc";
import MobileScreenAdhoc from "../_adhoc/mobilescreenadhoc";
import MdBodyList from "./_mdmainbody/mdBodyList";
import MobileMainBody from "./_mobilemainbody/mobileBodyList";

interface Props {
  data: any;
  isLoading?: any;
  error?: any;
  title?: any;
}

const BodyList = ({ data, isLoading, error, title }: Props) => {
  const router = useRouter();

  if (isLoading) return <Loader />;

  if (error) return <Error />;

  const handleClick = (x: any) => {
    const hasTitle = data?.some((x: { title: any }) => x.title);
    const hasTitlePost = data?.some((x: { title_post: any }) => x.title_post);

    if (hasTitle) {
      router.push(`/article/${x.id}`);
    } else if (hasTitlePost) {
      router.push(`/post/${x.id}`);
    }
  };

  const handleClickWrapper = (x: any) => {
    handleClick(x);
  };

  return (
    <>
      <LgScreenAdhoc>
        <LgBodyList
          title={title}
          data={data}
          handleClick={handleClickWrapper}
        />
      </LgScreenAdhoc>
      <FullScreenAdhoc>
        <XlBodyList
          title={title}
          data={data}
          handleClick={handleClickWrapper}
        />
      </FullScreenAdhoc>
      <MdScreenAdhoc>
        <MdBodyList />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileMainBody />
      </MobileScreenAdhoc>
    </>
  );
};

export default BodyList;
