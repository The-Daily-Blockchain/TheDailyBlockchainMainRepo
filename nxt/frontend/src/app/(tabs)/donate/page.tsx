import React from "react";

import FullScreenAdhoc from "@/app/_adhoc/fullscreenadhoc";
import Xldonate from "./responsive/xldonate";
import LgScreenAdhoc from "@/app/_adhoc/lgscreenadhoc";
import MdScreenAdhoc from "@/app/_adhoc/mdscreenadhoc";
import MobileScreenAdhoc from "@/app/_adhoc/mobilescreenadhoc";
import MobileDonate from "./responsive/mobiledonate";

const Page = () => {
  return (
    <>
      <FullScreenAdhoc>
        <Xldonate />
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <Xldonate />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MobileDonate />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileDonate />
      </MobileScreenAdhoc>
    </>
  );
};

export default Page;
