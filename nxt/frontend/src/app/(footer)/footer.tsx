import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="p-6 justify-center flex border-double border-t-4 font-bold bg-[#fff]">
      Copyright <AiOutlineCopyrightCircle className="mr-2" />
      The Daily Blockchain PH 2023
    </div>
  );
};

export default Footer;
