"use client";
import React, { useState } from "react";
import Link from "next/link";

function Dropdown({ data }) {
  const [DropDownOpen, setDropDownOpen] = useState(false);

  return (
    <li
      className="font-bold m-1 bg-transparent relative z-50"
      onMouseEnter={() => {
        setDropDownOpen(true);
      }}
      onMouseLeave={() => {
        setDropDownOpen(false);
      }}
    >
      <button className="flex items-center justify-between w-full font-bold text-white hover:underline px-2 bg-transparent transition duration-300 ease-in-out transform hover:scale-110">
        {data.title}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        className={`${
          !DropDownOpen && "hidden"
        } absolute top-6 font-normal bg-white divide-y divide-gray-100 rounded-lg w-50 shadow dark:bg-gray-700 dark:divide-gray-600 `}
      >
        <ul
          className="py-2 text-xs text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownLargeButton"
        >
          {data.links.map((el, index) => (
            <li key={index}>
              <Link
                href={el.path}
                className="block px-2 py-2 font-bold text-blue-900 hover:underline bg-transparent transition duration-300 ease-in-out transform hover:scale-105"
              >
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default Dropdown;
