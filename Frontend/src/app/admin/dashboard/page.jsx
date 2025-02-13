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
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "address", type: "text", label: "Address" }
    ],
    "institute-faculties": [
      { name: "id", type: "number", label: "ID" },
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" }
    ],
    "central-department": [
      { name: "id", type: "number", label: "ID" },
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "contact", type: "text", label: "Contact" },
      { name: "location", type: "text", label: "Location" },
      { name: "website", type: "text", label: "Website" },
      { name: "isActive", type: "checkbox", label: "Is Active" }
    ],
    campus: [
      { name: "id", type: "number", label: "ID" },
      { name: "ho_id", type: "number", label: "Head Office ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "location", type: "text", label: "Location" },
      { name: "website", type: "text", label: "Website" }
    ],
    department: [
      { name: "id", type: "number", label: "ID" },
      { name: "c_id", type: "number", label: "Campus ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "contact", type: "text", label: "Contact" }
    ],
    personnel: [
      { name: "id", type: "number", label: "ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "email", type: "email", label: "Email" },
      { name: "position", type: "text", label: "Position" },
      { name: "imageUrl", type: "text", label: "Image URL" },
      { name: "org_id", type: "number", label: "Organization ID" },
      { name: "faculty_id", type: "number", label: "Faculty ID" },
      { name: "campus_id", type: "number", label: "Campus ID" },
      { name: "dept_id", type: "number", label: "Department ID" },
      { name: "c_dept_id", type: "number", label: "Central Department ID" }
    ],
    program: [
      { name: "id", type: "number", label: "ID" },
      { name: "name", type: "text", label: "Name" },
      { name: "about", type: "textarea", label: "About" },
      { name: "director_id", type: "number", label: "Director ID" }
    ]
  };

  // Updated data structure based on SQL inserts
  const [data, setData] = useState({
    "central-office": [
      { org_id: 1, name: "Tribhuvan University", address: "Kirtipur, Kathmandu, Nepal" }
    ],
    "institute-faculties": [
      { id: 101, org_id: 1, name: "Institute of Medicine" },
      { id: 102, org_id: 1, name: "Institute of Engineering" },
      { id: 103, org_id: 1, name: "Institute of forestry" },
      { id: 104, org_id: 1, name: "Institute of Agriculture and Animal Sciences" },
      { id: 105, org_id: 1, name: "Faculty of Management" },
      { id: 106, org_id: 1, name: "Faculty of Humanities and Social Sciences" },
      { id: 107, org_id: 1, name: "Faculty of Education" },
      { id: 108, org_id: 1, name: "Faculty of Law" },
      { id: 109, org_id: 1, name: "Institute of Science and Technology" }
    ],
    "central-department": [
      {
        id: 201,
        org_id: 1,
        name: "Central Department of Computer Science and Information Technology",
        contact: "info@cdcsit.edu.np",
        location: "Kirtipur, Kathmandu",
        website: "https://cdcsit.tu.edu.np/",
        isActive: true
      }
    ],
    campus: [
      {
        id: 1001,
        ho_id: 102,
        name: "Pulchowk Engineering Campus",
        location: "Pulchowk, Lalitpur",
        website: "https://pcampus.edu.np/"
      },
      {
        id: 1002,
        ho_id: 102,
        name: "Thapathali Engineering Campus",
        location: "Thapathali, Kathmandu",
        website: "https://tcioe.edu.np/"
      }
    ],
    department: [
      {
        id: 101,
        c_id: 1001,
        name: "Department of Computer and Electronic Engineering",
        contact: "ece@ioe.edu.np"
      },
      {
        id: 102,
        c_id: 1001,
        name: "Department of Civil Engineering",
        contact: "civil@ioe.edu.np"
      }
    ],
    personnel: [
      {
        id: 1000001,
        name: "Prof. Keshar Jung Baral",
        email: "vcoffice@tu.edu.n",
        position: "Vice-Chancellor",
        imageUrl: "https://portal.tu.edu.np/medias/Authorities_2024_08_05_20_51_35.jpg",
        org_id: 1,
        faculty_id: null,
        campus_id: null,
        dept_id: null,
        c_dept_id: null
      }
    ],
    program: [
      {
        id: 301,
        name: "Bachelor of Education (B.Ed)",
        about: "Since 1996 Tribhuvan University (TU) has been implementing three-year Bachelor programs with an annual examination system...",
        director_id: null
      },
      {
        id: 302,
        name: "Master of Education (M.Ed)",
        about: "Master of Education is a two-year programme offered in constitutional and affiliated campuses under FoE scattered in different parts of the country...",
        director_id: null
      }
    ]
  });

  const entityLabels = {
    "central-office": "Central Office",
    "institute-faculties": "Institutes/Faculties",
    "central-department": "Central Departments",
    campus: "Campuses",
    department: "Departments",
    personnel: "Personnel",
    program: "Programs"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 overflow-y-scroll flex items-center justify-center  p-4">
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
            <div className="border rounded-lg overflow-scroll">
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

// "use client";
// import React, { useState, useEffect } from "react";
// import CentralOfficeData from "@/Helper/FetchCentralOfficeData";

// export default function CentralCampus() {
//   const [offices, setOffices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all offices
//   const fetchOffices = async () => {
//     setIsLoading(true);
//     const response = await CentralOfficeData("GET");
//     if (response.success) {
//       setOffices(response.data);
//     } else {
//       setError(response.error);
//     }
//     setIsLoading(false);
//   };

//   // Add new office
//   const addOffice = async (officeData) => {
//     const response = await CentralOfficeData("POST", {
//       NAME: officeData.name,
//       ADDRESS: officeData.address,
//     });
//     if (response.success) {
//       fetchOffices(); // Refresh the list
//     }
//     return response;
//   };

//   // Update office
//   const updateOffice = async (officeData) => {
//     const response = await CentralOfficeData("PUT", {
//       ID: officeData.id,
//       NAME: officeData.name,
//       ADDRESS: officeData.address,
//     });
//     if (response.success) {
//       fetchOffices(); // Refresh the list
//     }
//     return response;
//   };

//   // Delete office
//   const deleteOffice = async (officeId) => {
//     const response = await CentralOfficeData("DELETE", { ID: officeId });
//     if (response.success) {
//       fetchOffices(); // Refresh the list
//     }
//     return response;
//   };

//   useEffect(() => {
//     fetchOffices();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {offices.map((office) => (
//         <div key={office.OFFICE_ID}>
//           <h3>{office.NAME}</h3>
//           <p>{office.ADDRESS}</p>
//           <button onClick={() => deleteOffice(office.OFFICE_ID)}>Delete</button>
//           {/* Add your update UI here */}
//         </div>
//       ))}
//       {/* Add your create new office form here */}
//     </div>
//   );
// }
