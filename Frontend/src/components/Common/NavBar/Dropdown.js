"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

function Dropdown({ data, isMobile }) {
  const [DropDownOpen, setDropDownOpen] = useState(false)

  return (
    <li className="relative">
      <button
        onClick={() => setDropDownOpen(!DropDownOpen)}
        className={`w-full flex items-center justify-between font-medium text-white hover:bg-blue-600 px-4 py-3 transition-colors ${
          isMobile ? "" : "rounded-lg"
        }`}
      >
        {data.title}
        <ChevronDown size={18} className={`transition-transform duration-200 ${DropDownOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      <div
        className={`${!DropDownOpen ? "hidden" : "block"} ${
          isMobile ? "bg-blue-600" : "absolute top-full left-0 bg-white rounded-lg shadow-lg"
        } w-full lg:w-60`}
      >
        <ul className="py-1">
          {data.links.map((el, index) => (
            <li key={index}>
              <Link
                href={el.path}
                className={`block px-4 py-2 ${
                  isMobile ? "text-white hover:bg-blue-500" : "text-blue-900 hover:bg-blue-50"
                } transition-colors`}
              >
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default Dropdown

