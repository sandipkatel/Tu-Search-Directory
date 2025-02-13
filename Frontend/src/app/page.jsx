"use client";
import React, { useEffect } from "react";
import CarouselCompo from "@/components/Home/Carousel/Carousel";
import NoticeLine from "@/components/Home/NoticeLine/NoticeLine";
import IntroToTU from "@/components/Home/Intro/intro";

// ==================== Home Page ====================
export default function page() {
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
    </div>
  );
}
