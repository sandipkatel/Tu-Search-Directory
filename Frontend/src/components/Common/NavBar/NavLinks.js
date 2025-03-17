"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react"
import { navigateTo } from "@/services/navigation"
import Dropdown from "./Dropdown"
import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: BASE_URL,
})

function NavLinks() {
  const [facultyData, setFacultyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/institute-faculties")
      setFacultyData(response.data)
    } catch (err) {
      console.error("Error fetching data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const links = useMemo(
    () => [
      {
        title: "Home",
        path: "/",
      },
      {
        isDropdown: true,
        title: "Institute/Faculties",
        links: facultyData.map((faculty) => ({
          title: faculty.name,
          path: faculty.website,
        })),
      },
      {
        title: "Central Departments",
        path: "/Central-Departments/",
      },
      {
        title: "Campuses/Departments",
        path: "/Campus-Departs/",
      },
      {
        title: "Directory Structure",
        path: "/Hierarchical-Tree/",
      },
    ],
    [facultyData],
  )

  const handleNavigation = useCallback((path) => {
    navigateTo(path)
  }, [])

  const NavItem = useCallback(
    ({ item }) => (
      <li>
        {item.authDependent ? (
          <button
            onClick={() => handleNavigation(item.Altpath)}
            className={`w-full text-left font-medium text-white hover:bg-blue-600 px-4 py-1 transition-colors ${
              isMobile ? "" : "rounded-lg"
            }`}
          >
            {item.Alttitle}
          </button>
        ) : (
          <button
            onClick={() => handleNavigation(item.path)}
            className={`w-full text-left font-medium text-white hover:bg-blue-600 px-4 py-1 transition-colors ${
              isMobile ? "" : "rounded-lg"
            }`}
          >
            {item.title}
          </button>
        )}
      </li>
    ),
    [handleNavigation, isMobile],
  )

  if (isLoading) {
    return <div className="flex items-center justify-center py-2 text-white">Loading...</div>
  }

  return (
    <>
      {links.map((item, index) => (
        <React.Fragment key={index}>
          {item.isDropdown ? <Dropdown data={item} isMobile={isMobile} /> : <NavItem item={item} />}
        </React.Fragment>
      ))}
    </>
  )
}

export default React.memo(NavLinks)

