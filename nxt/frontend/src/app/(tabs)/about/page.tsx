import React from "react";
import FullScreenAdhoc from "@/app/_adhoc/fullscreenadhoc";
import MobileScreenAdhoc from "@/app/_adhoc/mobilescreenadhoc";
import MobileAbout from "./mobileabout";
import About from "./about";
import LgScreenAdhoc from "@/app/_adhoc/lgscreenadhoc";
import MdScreenAdhoc from "@/app/_adhoc/mdscreenadhoc";
import LgAbout from "./lgabout";

const page = () => {
  return (
    <>
      <FullScreenAdhoc>
        <About />
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <LgAbout />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MobileAbout />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileAbout />
      </MobileScreenAdhoc>
    </>
  );
};

export default page;
