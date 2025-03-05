"use client"
import "flowbite"
import { useState, useEffect } from "react"
import NavLinks from "./NavLinks"
import Link from "next/link"
import { X, Menu, Search } from "lucide-react"

export default function Navbar() {
  const [NavOpen, setNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // Increased breakpoint
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 bg-blue-700 shadow-md">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <Link href="/" className="flex items-center space-x-3 font-extrabold text-lg">
              <img src="/logo.png" className="h-8 lg:h-10" alt="TU Logo" />
              <span className="text-white">TU Search Directory</span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex-grow flex justify-center items-center">
                <ul className="flex items-center space-x-2">
                  <NavLinks />
                </ul>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                className="text-white hover:bg-blue-600 p-2 rounded-lg transition-colors"
                onClick={() => setNavOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden fixed inset-0 bg-blue-700 z-50 transition-transform duration-300 ease-in-out ${
              NavOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-blue-600">
                <Link href="/" className="flex items-center space-x-3">
                  <img src="/logo.png" className="h-8" alt="TU Logo" />
                  <span className="text-white font-extrabold text-lg">TU Search Directory</span>
                </Link>
                <button
                  onClick={() => setNavOpen(false)}
                  className="text-white hover:bg-blue-600 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-blue-600">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-blue-600 text-white placeholder-blue-300 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={18} />
                </div>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col py-2">
                  <NavLinks />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="scroll-watcher"></div>
    </>
  )
}

