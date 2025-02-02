"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";

const AdminDashboard = () => {
  const [activeEntity, setActiveEntity] = useState("central-office");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form fields configuration for each entity
  const entityFields = {
    "central-office": [
      { name: "org_id", type: "text", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "address", type: "text", label: "Address" },
    ],
    department: [
      { name: "dept_id", type: "text", label: "Department ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "contact", type: "text", label: "Contact" },
      { name: "isCentral", type: "checkbox", label: "Is Central Department" },
    ],
    institute: [
      { name: "id", type: "text", label: "ID" },
      { name: "org_id", type: "text", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "ho_id", type: "text", label: "Head Office ID" },
    ],
    campus: [
      { name: "id", type: "text", label: "ID" },
      { name: "ho_id", type: "text", label: "Head Office ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "location", type: "text", label: "Location" },
    ],
    program: [
      { name: "id", type: "text", label: "ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "about", type: "textarea", label: "About" },
      { name: "director_id", type: "text", label: "Director ID" },
    ],
    personnel: [
      { name: "id", type: "text", label: "ID" },
      { name: "dept_id", type: "text", label: "Department ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "email", type: "email", label: "Email" },
      { name: "position", type: "text", label: "Position" },
    ],
  };

  // Sample data structure
  const [data, setData] = useState({
    "central-office": [
      { org_id: "1", name: "Main Office", address: "123 Main St" },
    ],
    department: [
      {
        dept_id: "1",
        name: "Computer Science",
        contact: "555-0123",
        isCentral: true,
      },
    ],
    institute: [
      { id: "1", org_id: "1", name: "School of Engineering", ho_id: "HOD1" },
    ],
    campus: [
      { id: "1", ho_id: "HOD1", name: "Main Campus", location: "Downtown" },
    ],
    program: [
      {
        id: "1",
        name: "Computer Science",
        about: "BS Program",
        director_id: "DIR1",
      },
    ],
    personnel: [
      {
        id: "1",
        dept_id: "CS1",
        name: "John Doe",
        email: "john@example.com",
        position: "Professor",
      },
    ],
  });

  const entityLabels = {
    "central-office": "Central Office",
    department: "Departments",
    institute: "Institutes/Faculties",
    campus: "Campuses",
    program: "Programs",
    personnel: "Personnel",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {};
    entityFields[activeEntity].forEach((field) => {
      if (field.type === "checkbox") {
        newData[field.name] = formData.get(field.name) === "on";
      } else {
        newData[field.name] = formData.get(field.name);
      }
    });

    if (modalMode === "create") {
      setData((prev) => ({
        ...prev,
        [activeEntity]: [...prev[activeEntity], newData],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [activeEntity]: prev[activeEntity].map((item) =>
          item.id === editingItem.id ? { ...item, ...newData } : item
        ),
      }));
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setData((prev) => ({
      ...prev,
      [activeEntity]: prev[activeEntity].filter((item) => item.id !== id),
    }));
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
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
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow">
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
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(data[activeEntity][0] || {}).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-500"
                      >
                        {key.replace("_", " ").toUpperCase()}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data[activeEntity].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(item).map((value, i) => (
                        <td key={i} className="px-4 py-2">
                          {String(value)}
                        </td>
                      ))}
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal />}
    </div>
  );
};

export default AdminDashboard;
