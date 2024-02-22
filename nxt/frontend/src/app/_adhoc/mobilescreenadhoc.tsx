import React from "react";

interface Props {
  children: any;
}

const MobileScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="block md:hidden">
      <div>{children}</div>
    </div>
  );
};

export default MobileScreenAdhoc;
