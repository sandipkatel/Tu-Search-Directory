"use client";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigateTo } from "@/services/navigation";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = {
  get: (endpoint) => axios.get(`${BASE_URL}/${endpoint}`),
  post: (endpoint, data) => axios.post(`${BASE_URL}/${endpoint}`, data),
  put: (endpoint, data) => axios.put(`${BASE_URL}/${endpoint}`, data),
  delete: (endpoint) => axios.delete(`${BASE_URL}/${endpoint}`),
};

const AdminDashboard = () => {
  const [activeEntity, setActiveEntity] = useState("central-office");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    "central-office": [],
    "institute-faculties": [],
    "central-department": [],
    campus: [],
    department: [],
    personnel: [],
    program: [],
  });

  // Form fields configuration for each entity
  const entityFields = {
    "central-office": [
      { name: "name", type: "text", label: "Name" },
      { name: "address", type: "text", label: "Address" },
    ],
    "institute-faculties": [
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" },
    ],
    "central-department": [
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "contact", type: "text", label: "Contact" },
      { name: "location", type: "text", label: "Location" },
      { name: "website", type: "text", label: "Website" },
      { name: "isActive", type: "checkbox", label: "Is Active" },
    ],
    campus: [
      { name: "ho_id", type: "number", label: "Head Office ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "location", type: "text", label: "Location" },
      { name: "website", type: "text", label: "Website" },
    ],
    department: [
      { name: "c_id", type: "number", label: "Campus ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "contact", type: "text", label: "Contact" },
    ],
    personnel: [
      { name: "name", type: "text", label: "Name" },
      { name: "email", type: "email", label: "Email" },
      { name: "position", type: "text", label: "Position" },
      { name: "imageUrl", type: "text", label: "Image URL" },
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "faculty_id", type: "number", label: "Faculty ID" },
      { name: "campus_id", type: "number", label: "Campus ID" },
      { name: "dept_id", type: "number", label: "Department ID" },
      { name: "c_dept_id", type: "number", label: "Central Department ID" },
    ],
    program: [
      { name: "name", type: "text", label: "Name" },
      { name: "about", type: "textarea", label: "About" },
      { name: "director_id", type: "number", label: "Director ID" },
    ],
  };

  const entityLabels = {
    "central-office": "Central Office",
    "institute-faculties": "Institutes/Faculties",
    "central-department": "Central Departments",
    campus: "Campuses",
    department: "Departments",
    personnel: "Personnel",
    program: "Programs",
  };

  // Fetch data for the active entity
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigateTo("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    try {
      if (decodedToken.isAdmin === false) {
        navigateTo("/login");
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigateTo("/login");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(activeEntity);
      setData((prev) => ({
        ...prev,
        [activeEntity]: response.data,
      }));
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch data when active entity changes
  useEffect(() => {
    fetchData();
  }, [activeEntity]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.target);
    const newData = {};
    entityFields[activeEntity].forEach((field) => {
      if (field.type === "checkbox") {
        newData[field.name] = formData.get(field.name) === "on";
      } else {
        const value = formData.get(field.name);
        if (field.type === "number" && value) {
          newData[field.name] = Number(value);
        } else {
          newData[field.name] = value;
        }
      }
    });

    try {
      if (modalMode === "create") {
        await api.post(activeEntity, newData);
      } else {
        await api.put(`${activeEntity}/${editingItem.id}`, newData);
      }

      await fetchData(); // Refresh data after successful operation
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError(`Error saving data: ${err.message}`);
      console.error("Error submitting data:", err);
    }
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await api.delete(`${activeEntity}/${id}`);
      await fetchData(); // Refresh data after successful deletion
    } catch (err) {
      setError(`Error deleting item: ${err.message}`);
      console.error("Error deleting item:", err);
    }
  };

  // Filter data based on search term
  const filteredData = data[activeEntity].filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 overflow-y-scroll flex items-center justify-center p-4">
      <div className="mt-[250px] bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {modalMode === "create" ? "Create New" : "Edit"}{" "}
            {entityLabels[activeEntity]}
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {entityFields[activeEntity].map((field) => (
            <div key={field.name} className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  defaultValue={editingItem?.[field.name] || ""}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  defaultChecked={editingItem?.[field.name] || false}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  defaultValue={editingItem?.[field.name] || ""}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required={field.type !== "number"}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {modalMode === "create" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Administrative Dashboard</h1>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 border-r p-4">
            <div className="space-y-2">
              {Object.entries(entityLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveEntity(key)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeEntity === key
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 p-4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {entityLabels[activeEntity]}
              </h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 pr-4 py-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    setModalMode("create");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-x-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : filteredData.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? "No results found" : "No data available"}
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(data[activeEntity][0] || {}).map((key) => (
                        <th
                          key={key}
                          className="px-4 py-2 text-left text-sm font-medium text-gray-500"
                        >
                          {key.replace(/_/g, " ").toUpperCase()}
                        </th>
                      ))}
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(item).map((value, i) => (
                          <td key={i} className="px-4 py-2">
                            {typeof value === "boolean"
                              ? value
                                ? "Yes"
                                : "No"
                              : String(value)}
                          </td>
                        ))}
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal />}
    </div>
  );
};

export default AdminDashboard;
