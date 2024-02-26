import React from "react";

interface Props {
  children: any;
}

const MdMainScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="hidden md:block lg:hidden">
      <div>{children}</div>
    </div>
  );
};

export default MdMainScreenAdhoc;
