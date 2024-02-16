import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="hidden md:block">
        <div className="grid grid-cols-[1fr,3fr,1fr]">
          <div className="bg-black">components</div>
          <div>
            <div className="grid grid-cols-2">
              <div className="align-center text-center items-center">
                <Image
                  className="mx-auto"
                  src="/black.png"
                  width={500}
                  height={500}
                  alt="thedailyblockchainph"
                />
              </div>
              <div className="mt-28 w-3/5 mx-4">
                <div className="text-[30px] text-center mb-4 font-bold">
                  ABOUT
                </div>
                With a small team of like-minded individuals, The founders
                founded a company called The Daily Blockchain PH. Their mission
                was to provide news and updates about the latest developments in
                the world of blockchain, cryptocurrency, and decentralized
                finance. They aimed to be the go-to source of information for
                individuals and businesses who wanted to stay ahead of the game.
              </div>
            </div>
            <div className="mx-44 mb-12 mt-6 text-center">
              <div className="text-[30px] font-bold mb-5">Vission/Mission</div>
              <div className="text-start md:w-6/12 mx-auto">
                <span className="font-bold"> Vision:</span> To become the
                primary destination for comprehensive news, analysis, and
                education on the blockchain industry in the Philippines.
                <br />
                <br />
                <span className="font-bold">Mission:</span> Our mission is to
                provide an unparalleled news experience that covers the latest
                developments and trends in blockchain and cryptocurrency. We
                believe that accurate and reliable information is essential for
                our audience to make informed decisions, and we are committed to
                delivering it with the highest standards of journalistic
                excellence. We also recognize the importance of education in
                this rapidly evolving field, and we strive to provide in-depth
                resources and guides for blockchain enthusiasts, students, and
                professionals. Our goal is to become the most trusted and
                reputable source of blockchain and cryptocurrency news and
                education in the Philippines, and to foster the growth and
                adoption of this revolutionary technology.
              </div>
            </div>
          </div>
          <div className="bg-black"></div>
        </div>
      </div>
      {/* mobile device */}
      <div className="block md:hidden">
        <div className="mx-3 my-3">
          <div className="flex text-center items-center justify-center text-[24px] font-bold">
            {/* <img src={black} className="h-20 w-20" alt="thedailyblockchainph" /> */}
            ABOUT
          </div>
          <div className="my-3">
            With a small team of like-minded individuals, The founders founded a
            company called The Daily Blockchain PH. Their mission was to provide
            news and updates about the latest developments in the world of
            blockchain, cryptocurrency, and decentralized finance. They aimed to
            be the go-to source of information for individuals and businesses
            who wanted to stay ahead of the game.
          </div>
          <div className="text-[24px] font-bold text-center mb-3">
            Vission/Mission
          </div>
          <div className="mb-3">
            Vision: To become the primary destination for comprehensive news,
            analysis, and education on the blockchain industry in the
            Philippines.
          </div>
          <div className="mb-12">
            Mission: Our mission is to provide an unparalleled news experience
            that covers the latest developments and trends in blockchain and
            cryptocurrency. We believe that accurate and reliable information is
            essential for our audience to make informed decisions, and we are
            committed to delivering it with the highest standards of
            journalistic excellence. We also recognize the importance of
            education in this rapidly evolving field, and we strive to provide
            in-depth resources and guides for blockchain enthusiasts, students,
            and professionals. Our goal is to become the most trusted and
            reputable source of blockchain and cryptocurrency news and education
            in the Philippines, and to foster the growth and adoption of this
            revolutionary technology.
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
