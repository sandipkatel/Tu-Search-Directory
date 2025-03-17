"use client";

import React, { useState, useEffect } from "react";
import { Globe, MapPin, Building, ExternalLink, Contact } from "lucide-react";
import axios from "axios";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` || "http://localhost:5000/api";

const api = {
  get: (endpoint) => axios.get(`${BASE_URL}/${endpoint}`),
};

const centralDepartmentDepartments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [centralDepartmentData, setcentralDepartmentData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("central-department");
      setcentralDepartmentData(response.data);
      console.log(response.data);
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
            Central Departments
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of all central department's details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {centralDepartmentData.map((centralDepartment, index) => (
            <AnimatedElement duration={800}>
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-white border-b pb-4">
                  <CardTitle className="flex items-center text-lg font-semibold">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    {centralDepartment.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{centralDepartment.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Contact className="w-4 h-4 mr-2" />
                      <span>{centralDepartment.contact}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href={centralDepartment.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>

                    <div className="flex justify-end items-center text-gray-600">
                      {centralDepartment.isactive == true ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </div>
  );
};

export default centralDepartmentDepartments;
