import React from "react";
import Image from "next/image";

const Xldonate = () => {
  return (
    <>
      <div className="text-center font-bold mt-10 mb-10 text-[32px]">
        Donate To Us
      </div>
      <div className="grid grid-cols-2 mb-64">
        <div className="text-left my-12 md:w-7/12 justify-self-end">
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
        <div className="my-12 ml-24 justify-self-start">
          <div className="flex justify-center items-center text-[32px]">
            Gcash QR
          </div>
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

export default Xldonate;
