
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { navigateTo } from "@/services/navigation";
import Dropdown from "./Dropdown";
import { useAuth } from "@/context/auth";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

function NavLinks() {
  const { authUser } = useAuth();
  const [facultyData, setFacultyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/institute-faculties");
      setFacultyData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const links = useMemo(() => [
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
      path: "/Centeral-Departments/",
    },
    {
      title: "Campuses/Departments",
      path: "/Campus-Departs/",
    },
    {
      authDependent: true,
      title: "LogIn",
      path: "/login",
      Alttitle: "Dashboard",
      Altpath: "/admin/dashboard",
    },
  ], [facultyData]);

  const handleNavigation = useCallback((path) => {
    navigateTo(path);
  }, []);

  const NavItem = useCallback(({ item }) => (
    <li className="m-1 transition duration-300 ease-in-out transform hover:scale-110">
      {item.authDependent && authUser && authUser?.isAdmin ? (
        <button
          onClick={() => handleNavigation(item.Altpath)}
          className="font-bold text-white hover:underline px-2 bg-transparent"
        >
          {item.Alttitle}
        </button>
      ) : (
        <button
          onClick={() => handleNavigation(item.path)}
          className="font-bold text-white hover:underline px-2 bg-transparent"
        >
          {item.title}
        </button>
      )}
    </li>
  ), [authUser, handleNavigation]);

  if (isLoading) {
    return <div className="flex gap-4">Loading...</div>;
  }

  return (
    <>
      {links.map((item, index) => (
        <React.Fragment key={index}>
          {item.isDropdown ? (
            <Dropdown data={item} />
          ) : (
            <NavItem item={item} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default React.memo(NavLinks);