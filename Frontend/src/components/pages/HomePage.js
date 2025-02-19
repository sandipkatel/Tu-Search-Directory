"use client";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarouselCompo from "@/components/Home/Carousel/Carousel";
import NoticeLine from "@/components/Home/NoticeLine/NoticeLine";
import IntroToTU from "@/components/Home/Intro/intro";
import SearchBar from "@/components/Home/SearchBar/SearchBar";

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
      {/* <SearchBar /> */}
      <NoticeLine />
      <IntroToTU />
    </div>
  );
}
