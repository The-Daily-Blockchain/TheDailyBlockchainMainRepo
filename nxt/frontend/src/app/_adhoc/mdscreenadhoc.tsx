import React from "react";

interface Props {
  children: any;
}

const MdScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="hidden md:block lg:hidden">
      <div className="grid grid-cols-[1fr,3fr]">
        <div className="bg-black"></div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MdScreenAdhoc;
