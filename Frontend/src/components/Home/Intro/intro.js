"use client";
import React from "react";
import Image from "next/image";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import "./Message.styles.css";

export default function IntroToTU() {
  return (
    <div className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="relative rounded-xl">
            <AnimatedElement>
              <div className="relative w-64 h-64 rounded-xl md:w-80 md:h-80">
                {/* Modern Image Container */}
                <div className="absolute inset-0 p-1.5">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/about.png"
                      width={300}
                      height={300}
                      alt="Tribhuvan University Emblem"
                      className="w-full h-full object-cover transition-all duration-300 rounded-xl cursor-pointer filter grayscale hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* Intro Section */}
          <div className="flex-1 text-center md:text-left">
            <AnimatedElement>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Who are we?
              </h2>
              <p className="text-lg text-gray-700 font-serif dark:text-gray-300 mb-6 leading-relaxed">
                “Established in 1959, Tribhuvan University stands as Nepal’s
                oldest and most prestigious institution of higher education.
                With a rich legacy of academic excellence, we are committed to
                fostering innovation, research, and holistic development. Our
                diverse community of students, faculty, and alumni continues to
                shape the future of Nepal and beyond, driven by a shared vision
                of knowledge, integrity, and progress.”
              </p>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-blue-600">
                  A Legacy of Excellence
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Over six decades of shaping minds and transforming lives
                </span>
                <span className="text-sm text-gray-500 mt-2">
                  Home to over 600,000 students and 1,000+ affiliated colleges
                </span>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </div>
  );
}
