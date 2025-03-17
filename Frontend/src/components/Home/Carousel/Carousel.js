"use client";
// ======================== Imports ========================
import "flowbite";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FetchCarouselImages from "@/Helper/FetchCarouselImages";
import SearchBar from "@/components/Home/SearchBar/SearchBar";

export default function CarouselCompo() {
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
    <div className="relative flex flex-col h-full w-full">
      <div className=" md:h-[calc(100vh*0.86)]">
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
              <div key={index} className="relative h-[calc(100vh*0.86)] w-full">
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
          <div className="relative w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
