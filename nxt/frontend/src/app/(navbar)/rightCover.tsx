"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const RightCover = () => {
  const slides = [
    {
      url: "/1.png",
      width: 30,
      height: 30,
    },
    {
      url: "/2.png",
      width: 30,
      height: 30,
    },
    {
      url: "/3.png",
      width: 30,
      height: 30,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const autoScroll = true;
  let slideInterval: any;
  let intervalTime = 1500;

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (autoScroll) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="mb-10">
      <div className="h-[585px]">
        <div
          className="max-w-[1280] w-11/12 mx-auto py-6 h-full px-4 relative group"
          style={{ overflow: "hidden" }}
        >
          <div className="relative w-full h-3/4 overflow-hidden rounded-2xl">
            <Image
              src={slides[currentIndex].url}
              alt={`Slide ${currentIndex + 1}`}
              layout="fill"
              className="w-full rounded-2xl duration-500"
              objectFit="cover"
            />
            <div className="flex top-4 justify-center">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`slide ${
                    slideIndex === currentIndex ? "" : ""
                  } transition-opacity duration-1000 ease-in-out`}
                  style={{ opacity: slideIndex === currentIndex ? 1 : 0.3 }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightCover;
