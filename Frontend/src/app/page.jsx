"use client";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import SearchPage from "@/components/pages/SearchPage";

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<HomePage />} />
        {/* <Route
          path="/personnel/:id"
          element={<div>Personnel Detail Page</div>}
        />
        <Route
          path="/department/:id"
          element={<div>Department Detail Page</div>}
        />
        <Route path="/campus/:id" element={<div>Campus Detail Page</div>} />
        <Route path="/faculty/:id" element={<div>Faculty Detail Page</div>} />
        <Route path="/program/:id" element={<div>Program Detail Page</div>} /> */}
      </Routes>
    </Router>
  );
}
