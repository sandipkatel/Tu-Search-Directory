"use client";
import React from "react";
import { navigateTo } from "@/services/navigation"; // Import the navigate function
import Dropdown from "./Dropdown";
import { useAuth } from "@/context/auth";

function NavLinks() {
  const { authUser, IsLoading, setAuthUser } = useAuth();
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Institute/Faculties",
      path: "/Faculties/",
    },
    {
      title: "Central Officies",
      path: "/Centeral-Offices/",
    },
    {
      title: "Campuses/Departments",
      path: "/Campuse-Departs/",
    },
    {
      authDependent: true,
      title: "LogIn",
      path: "/login",
      Alttitle: "Dashboard",
      Altpath: "/admin/dashboard",
    },
  ];

  const handleNavigation = (path) => {
    navigateTo(path); // Use the navigate function for navigation
  };

  return (
    <>
      {links.map((el, index) => (
        <React.Fragment key={index}>
          {el.isDropdown ? (
            <Dropdown data={el} />
          ) : (
            <li className="m-1 transition duration-300 ease-in-out transform hover:scale-110">
              {el.authDependent && authUser && authUser?.isAdmin ? (
                <button
                  onClick={() => handleNavigation(el.Altpath)}
                  className="font-bold text-white hover:underline px-2 bg-transparent"
                >
                  {el.Alttitle}
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation(el.path)}
                  className="font-bold text-white hover:underline px-2 bg-transparent"
                >
                  {el.title}
                </button>
              )}
            </li>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default NavLinks;
