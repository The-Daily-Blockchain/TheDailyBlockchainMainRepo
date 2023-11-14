import React from "react";
import Image from "next/image";

const LeftCover = () => {
  return (
    <div className="grid">
      <div className="text-[22px] mt-5 font-bold grid justify-center text-[#303030]">
        Top Stories
      </div>
      <div className="justify-items-end ml-[75px]">
        <div className="grid grid-cols-2 border-b-2 border-solid border-[#727272] pb-6">
          <div>
            <div className="flex justify-end items-center mr-8">
              <Image src="/btc.jpg" width={280} height={280} alt="BTC" />
            </div>
            <div className="flex justify-center items-center mt-2">
              By: Dexter james Lente
            </div>
          </div>
          <div>
            <div className="text-[16px] font-medium text-[#121212]">
              LOREM LOREM IPSUMSUM SAMESSAME LOREM LOREM
            </div>
            <div className="text-[#5a5a5a] text-[12px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisis hendrerit justo, ut maximus augue malesuada vel. Nunc
              non laoreet diam, quis bibendum quam. Aliquam facilisis purus nec
              elit semper feugiat. Integer sit amet scelerisque nunc, sed
              interdum ipsum. Quisque commodo nec odio eu mattis. Proin nec nibh
              ut mauris vestibulum pharetra at ut ex. Cras risus neque,
              facilisis vel rhoncus a, pulvinar sed lacus.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b-2 border-solid border-[#727272] pb-6">
          <div>
            <div className="flex justify-end items-center mr-8 mt-2">
              <Image src="/btc.jpg" width={280} height={280} alt="BTC" />
            </div>
            <div className="flex justify-center items-center">
              By: Dexter james Lente
            </div>
          </div>
          <div>
            <div className="text-[16px] font-medium text-[#121212]">
              LOREM LOREM IPSUMSUM SAMESSAME LOREM LOREM
            </div>
            <div className="text-[#5a5a5a] text-[12px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisis hendrerit justo, ut maximus augue malesuada vel. Nunc
              non laoreet diam, quis bibendum quam. Aliquam facilisis purus nec
              elit semper feugiat. Integer sit amet scelerisque nunc, sed
              interdum ipsum. Quisque commodo nec odio eu mattis. Proin nec nibh
              ut mauris vestibulum pharetra at ut ex. Cras risus neque,
              facilisis vel rhoncus a, pulvinar sed lacus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCover;
