"use client";
import React, { useEffect } from "react";
import { CarouselCompo } from "@/components/Home/Carousel/Carousel";
import AboutCard from "@/components/About/AboutCard";
import NoticeLine from "@/components/Home/NoticeLine/NoticeLine";
import Message from "@/components/Home/Message/Message";
import EventCardSection from "@/components/EventCard/EventCardSection";
import HighlightsSection from "@/components/Highlights/HighlightsSection";

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
      <Message />
      <AboutCard />
      <EventCardSection />
      <HighlightsSection />
    </div>
  );
}
