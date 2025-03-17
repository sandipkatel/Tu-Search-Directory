// Code: Home Page
"use client";
import React, { useEffect } from "react";
import CarouselCompo from "@/components/Home/Carousel/Carousel";
import NoticeLine from "@/components/Home/NoticeLine/NoticeLine";
import IntroToTU from "@/components/Home/Intro/intro";
import Highlights from "@/components/Home/Highlights/Highlights";

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
    <div>
      <CarouselCompo />
      <NoticeLine />
      <IntroToTU />
      <Highlights />
    </div>
  );
}
