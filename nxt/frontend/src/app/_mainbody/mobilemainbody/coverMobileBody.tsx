import MobileCover from "@/app/_navbar/mobilefolder/mobileCover";
import React from "react";

interface Props {
  data: any;
}

const CoverMobileBody = ({ data }: Props) => {
  return (
    <div className="pt-6 border-b-2 mb-12 border-solid border-[#727272]">
      <MobileCover data={data} />
    </div>
  );
};

export default CoverMobileBody;
