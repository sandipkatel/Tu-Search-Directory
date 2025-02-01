"use client";
// ======================== Imports ========================
import "flowbite";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FetchCarouselImages from "@/Helper/FetchCarouselImages";

export function CarouselCompo() {
  const [CarouselImages, setCarouselImages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchCarouselImages();
      if (res.success) {
        setCarouselImages(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" md:h-[calc(100vh*0.9)]">
      {CarouselImages && (
        <Carousel
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
          transitionTime={800}
          dynamicHeight={false}
          axis="vertical"
        >
          {CarouselImages.map((image, index) => (
            <div key={index} className="relative h-[calc(100vh*0.9)] w-full">
              <img
                src={image.ImageLink}
                alt="image"
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-white opacity-80 z-20"></div>
            </div>
          ))}
        </Carousel>
      )}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to Tribhuvan University Search Directory
        </h1>
        <div className="relative">
          <input
            type="text"
            id="search-navbar"
            className="w-full rounded-2xl bg-white/80 py-3 pl-12 pr-4 text-lg text-black outline-none placeholder:text-gray-500"
            placeholder="Search..."
          />
          <svg
            className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
