"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  MapPin,
  Building,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Contact,
} from "lucide-react";
import axios from "axios";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const api = {
  get: (endpoint) => axios.get(`${BASE_URL}/${endpoint}`),
};

const CampusDepartments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campusData, setCampusData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [campusFacultyData, setCampusFacultyData] = useState([]);
  const [expandedCampus, setExpandedCampus] = useState({});

  // Toggle department visibility for a campus
  const toggleCampusExpand = (campusId) => {
    setExpandedCampus((prev) => ({
      ...prev,
      [campusId]: !prev[campusId],
    }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Make parallel API calls for better performance
      const [campusResponse, facultyResponse, departmentResponse] =
        await Promise.all([
          api.get("campus"),
          api.get("institute-faculties"),
          api.get("department"),
        ]);

      setCampusData(campusResponse.data);
      setCampusFacultyData(facultyResponse.data);
      setDepartmentData(departmentResponse.data);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const getFacultyName = (id) => {
    const faculty = campusFacultyData.find((item) => item.id === id);
    return faculty ? faculty.name : "N/A";
  };

  const getCampusName = (id) => {
    const campus = campusData.find((item) => item.id === id);
    return campus ? campus.name : "N/A";
  };

  // Get departments for a specific campus
  const getCampusDepartments = (campusId) => {
    return departmentData.filter((dept) => dept.c_id === campusId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Campuses and Departments
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of all campus locations and details
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {campusData.map((campus, index) => {
            const campusDepartments = getCampusDepartments(campus.id);
            const isExpanded = expandedCampus[campus.id] || false;

            return (
              <AnimatedElement duration={800}>
                <div
                  key={index}
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  {/* Campus Card */}
                  <Card className="border-0 shadow-none">
                    <CardHeader className="bg-gray-50 border-b pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center text-lg font-semibold">
                          <Building className="w-5 h-5 mr-2 text-blue-800" />
                          {campus.name}
                        </div>
                        {campusDepartments.length > 0 && (
                          <button
                            onClick={() => toggleCampusExpand(campus.id)}
                            className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Building className="w-4 h-4 mr-2" />
                          <span>
                            Institute/Faculty: {getFacultyName(campus.ho_id)}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{campus.location}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Globe className="w-4 h-4 mr-2" />
                          <a
                            href={campus.website ? campus.website : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            Visit Website
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>

                        {campusDepartments.length > 0 && (
                          <div className="flex items-center text-gray-600">
                            <span className="font-medium">Departments:</span>
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {campusDepartments.length}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Departments Section - Collapsible */}
                  {isExpanded && campusDepartments.length > 0 && (
                    <div className="bg-gray-50 p-4 border-t">
                      <h3 className="text-md font-medium mb-3 text-gray-700">
                        Departments
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {campusDepartments.map((dept, deptIndex) => (
                          <Card
                            key={deptIndex}
                            className="border hover:shadow-md transition-shadow duration-200"
                          >
                            <CardHeader className="p-3 pb-2 border-b">
                              <CardTitle className="text-sm font-medium flex items-center">
                                <Building className="w-4 h-4 mr-2 text-blue-800" />
                                {dept.name}
                              </CardTitle>
                            </CardHeader>
                            {dept.contact && (
                              <CardContent className="p-3">
                                <div className="text-sm">
                                  <div className="flex items-center text-gray-600 mb-1">
                                    <Contact className="w-3 h-3 mr-1" />
                                    <span>{dept.contact}</span>
                                  </div>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampusDepartments;
