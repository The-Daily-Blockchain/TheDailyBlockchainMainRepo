import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="border-double border-t-4">
      <div className="bg-white z-10" style={{ visibility: "hidden" }}>
        <div className="text-center">
          .. -. / -- . -- --- .-. -.-- / --- ..-. / --. .-. .- -.-. . / .-.. .
          -. - .
        </div>
      </div>
      <div className="justify-center flex font-bold bg-[#fff]">
        Copyright <AiOutlineCopyrightCircle className="mr-2" />
        The Daily Blockchain PH 2023
      </div>
      <div className="bg-white z-10" style={{ visibility: "hidden" }}>
        <div className="text-center">
          .. -. / -- . -- --- .-. -.-- / --- ..-. / --. .-. .- -.-. . / .-.. .
          -. - .
        </div>
      </div>
    </div>
  );
};

export default Footer;
