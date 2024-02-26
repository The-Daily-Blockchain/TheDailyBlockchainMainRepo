import React from "react";
import Image from "next/image";

const MobileDonate = () => {
  return (
    <>
      <div className="text-center font-bold mt-10 mb-10 text-[32px]">
        Donate To Us
      </div>
      <div className="grid grid-cols-1">
        <div className="mx-8">
          As a non-profit news site dedicated to providing accurate and
          up-to-date information about blockchain technology, we rely on the
          generosity of our readers to keep us running. Your donation can help
          us continue to produce high-quality content that educates and informs
          people about the potential of blockchain, and its impact on various
          industries. With your support, we can cover the costs of web hosting,
          content creation, and other essential expenses, while also expanding
          our coverage and reach. Whether you are a blockchain enthusiast or
          simply believe in supporting independent journalism, your contribution
          can make a difference in our ability to bring reliable and unbiased
          news to the wider community. Thank you for considering a donation to
          our news site, and for helping us promote transparency, innovation,
          and progress in the world of blockchain.
        </div>
        <div className="mb-8 mt-4">
          <div className="text-center font-bold text-[22px] mb-2">Gcash QR</div>
          <Image
            src="/dexgcash.jpg"
            width={500}
            height={500}
            alt="gcash"
            className="mx-auto h-48 w-48"
          />
        </div>
      </div>
    </>
  );
};

export default MobileDonate;
