"use client";
import React, { useEffect } from "react";
import CarouselCompo from "@/components/Home/Carousel/Carousel";
import NoticeLine from "@/components/Home/NoticeLine/NoticeLine";
import IntroToTU from "@/components/Home/Intro/intro";

// ==================== Home Page ====================
export default function HomePage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
  //   <div>
  //     <CarouselCompo />
  //     {/* <SearchBar /> */}
  //     <NoticeLine />
  //     <IntroToTU />
  //   </div>
  <div className="max-w-8xl mx-auto px-4 bg-gray-50">
      <CarouselCompo />
      <NoticeLine />
      <IntroToTU />
      
      <div className="bg-white rounded-lg border-2 border-blue-600 shadow-md my-2 overflow-hidden">
        <div className="p-4 bg-blue-700 text-white font-bold">
          Official Tribhuvan University Website
        </div>
        <div className="w-full h-screen border-0">
          <iframe 
            src="https://tu.edu.np/"
            className="w-full h-full"
            title="Tribhuvan University Official Website"
            style={{
              border: 'none',
              borderRadius: '0 0 0.5rem 0.5rem'
            }}
          />
        </div>
      </div>
    </div>
  );
}
