"use client";
// ======================== Imports ========================
import "flowbite";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";

export default function Navbar() {
  const [NavOpen, setNavOpen] = useState(false);

  return (
    <>
      <div className="sticky bg-white bg-opacity-40 top-0 z-50 backdrop-blur-2xl transform transition-all duration-1000 ease-in-out">
        <nav className="bg-transparent flex justify-evenly items-center">
          <Link
            href="/"
            className="absolute inset-0 ps-5 flex items-center space-x-3 font-extrabold text-lg"
          >
            <img
              src="/logo.png"
              className="h-8 md:h-10 lg:h-12"
              alt="TU Logo"
            />
            <span className="text-white">TU Search Directory</span>
          </Link>

          <button
            className="md:hidden"
            onClick={() => {
              setNavOpen((prev) => !prev);
            }}
          >
            <HamburgerIcon NavOpen={NavOpen} />
          </button>
          <div
            className={`items-center justify-center ${
              NavOpen ? "h-96 p-2" : "h-0"
            } transition-transition-height duration-500 ease-in-out overflow-hidden md:overflow-visible md:h-full md:p-3 w-full md:flex bg-blue-700 md:order-1`}
          >
            {/* Mobile Search */}
            <div className="relative mt-3 md:hidden border-2 border-gray-300 rounded-lg">
              <div className="absolute pl-2 inset-y-0 start-0 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
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

            {/* Nav Links */}
            <ul className="flex flex-col p-2 md:p-0 font-medium md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
              <NavLinks />
            </ul>
          </div>
        </nav>
      </div>

      <div className="scroll-watcher"></div>
    </>
  );
}
