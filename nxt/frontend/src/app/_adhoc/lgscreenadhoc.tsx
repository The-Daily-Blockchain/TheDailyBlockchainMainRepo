import React from "react";

interface Props {
  children: any;
}

const LgScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="hidden lg:block xl:hidden">
      <div className="grid grid-cols-[1fr,3fr,1fr]">
        <div className="bg-black"> </div>
        <div>{children}</div>
        <div className="bg-black"></div>
      </div>
    </div>
  );
};

export default LgScreenAdhoc;
