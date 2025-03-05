"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  User,
  Building,
  School,
  Book,
  Briefcase,
  Search,
  RefreshCw,
  Filter,
  Info,
  X,
} from "lucide-react";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";

export default function TreeViewPage() {
  const [treeData, setTreeData] = useState([]);
  const [centralDepts, setCentralDepts] = useState([]);
  const [otherNodes, setOtherNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        setLoading(true);
        // Change this URL to match your API endpoint
        const response = await fetch("http://localhost:5000/tree", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tree data");
        }

        const data = await response.json();
        setTreeData(data);

        // Separate central departments from other nodes
        separateTreeData(data);
      } catch (err) {
        console.error("Error fetching tree data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, []);

  // Function to separate central departments from other nodes
  const separateTreeData = (data) => {
    const departments = [];
    const others = [];

    // First level filtering
    data.forEach((node) => {
      if (node.type === "Central Department") {
        departments.push(node);
      } else {
        // Deep clone to avoid reference issues
        others.push({ ...node });
      }
    });

    // Filter out central departments that might be nested in other nodes
    const filterCentralDepts = (nodes) => {
      return nodes.map((node) => {
        if (node.children && node.children.length > 0) {
          const filteredChildren = [];
          const centralDeptChildren = [];

          node.children.forEach((child) => {
            if (child.type === "Central Department") {
              centralDeptChildren.push(child);
            } else {
              filteredChildren.push(child);
            }
          });

          // Add found central departments to our departments array
          departments.push(...centralDeptChildren);

          // Return node with filtered children
          return {
            ...node,
            children: filterCentralDepts(filteredChildren),
          };
        }
        return node;
      });
    };

    const filteredOthers = filterCentralDepts(others);
    setCentralDepts(departments);
    setOtherNodes(filteredOthers);
  };

  // Search function to filter nodes
  const filterTree = (nodes, term, type) => {
    if (!term.trim() && !type) return nodes;

    return nodes
      .map((node) => {
        // Check if current node matches search term
        const matchesName = term
          ? node.name?.toLowerCase().includes(term.toLowerCase())
          : true;

        // Check if current node matches filter type
        const matchesType = type
          ? node.type?.toLowerCase() === type.toLowerCase()
          : true;

        const matches = matchesName && matchesType;

        // Check children recursively
        let filteredChildren = [];
        if (node.children && node.children.length > 0) {
          filteredChildren = filterTree(node.children, term, type);
        }

        // Return node with filtered children if match found
        if (matches || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const filteredCentralDepts = filterTree(centralDepts, searchTerm, filterType);
  const filteredOtherNodes = filterTree(otherNodes, searchTerm, filterType);

  const nodeTypes = [
    { type: "Central Office", color: "blue" },
    { type: "Central Department", color: "blue" },
    { type: "Faculty", color: "green" },
    { type: "Campus", color: "purple" },
    { type: "Department", color: "orange" },
    { type: "Personnel", color: "gray" },
    { type: "Program", color: "indigo" },
    { type: "Programs Group", color: "indigo" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700">
            Loading university directory structure...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <X className="text-red-600" size={32} />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Directory
          </p>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            onClick={() => window.location.reload()}
          >
            <div className="flex items-center justify-center">
              <RefreshCw size={18} className="mr-2" />
              Try Again
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h1 className="text-3xl font-bold mb-2">
              University Directory Structure
            </h1>
            <p className="opacity-90">
              Explore the complete organizational structure of the university
            </p>
          </div>

          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search the directory..."
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <select
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {nodeTypes.map((item) => (
                    <option key={item.type} value={item.type}>
                      {item.type}
                    </option>
                  ))}
                </select>

                <button
                  className={`px-4 py-3 rounded-lg font-medium flex items-center shadow-sm ${
                    expandAll
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={() => setExpandAll(!expandAll)}
                >
                  {expandAll ? (
                    <ChevronDown size={18} className="mr-1" />
                  ) : (
                    <ChevronRight size={18} className="mr-1" />
                  )}
                  {expandAll ? "Collapse All" : "Expand All"}
                </button>

                <button
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setShowLegend(!showLegend)}
                  title="Show icon legend"
                >
                  <Info size={18} />
                </button>
              </div>
            </div>

            {showLegend && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-sm text-gray-700 mb-2">
                  Icon Legend
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {nodeTypes.map((item) => (
                    <div key={item.type} className="flex items-center">
                      <span className="mr-2">{getNodeIcon(item.type)}</span>
                      <span className="text-sm">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            {filteredOtherNodes.length > 0 ||
            filteredCentralDepts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Main Structure */}
                <div>
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                      <School className="mr-2" size={20} />
                      Main University Structure
                    </h2>
                  </div>
                  <div className="max-h-[65vh] overflow-y-auto pr-2 border-r md:border-r-0">
                    {filteredOtherNodes.length > 0 ? (
                      filteredOtherNodes.map((rootNode) => (
                        <AnimatedElement>
                          <TreeNode
                            key={rootNode.id}
                            node={rootNode}
                            level={0}
                            defaultOpen={expandAll}
                            searchTerm={searchTerm}
                          />
                        </AnimatedElement>
                      ))
                    ) : (
                      <NoResultsMessage
                        searchTerm={searchTerm}
                        filterType={filterType}
                        hasData={otherNodes.length > 0}
                        onClearFilters={() => {
                          setSearchTerm("");
                          setFilterType("");
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Right Column - Central Departments */}
                <div>
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                      <Building className="mr-2" size={20} />
                      Central Departments
                    </h2>
                  </div>
                  <div className="max-h-[65vh] overflow-y-auto pr-2">
                    {filteredCentralDepts.length > 0 ? (
                      filteredCentralDepts.map((rootNode) => (
                        <AnimatedElement>
                          <TreeNode
                            key={rootNode.id}
                            node={rootNode}
                            level={0}
                            defaultOpen={expandAll}
                            searchTerm={searchTerm}
                          />
                        </AnimatedElement>
                      ))
                    ) : (
                      <NoResultsMessage
                        searchTerm={searchTerm}
                        filterType={filterType}
                        hasData={centralDepts.length > 0}
                        onClearFilters={() => {
                          setSearchTerm("");
                          setFilterType("");
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mb-4">
                  <Search className="mx-auto text-gray-400" size={48} />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-500">
                  {treeData.length > 0
                    ? "Try adjusting your search or filter criteria."
                    : "No data available. Please check your database connection."}
                </p>
                {(searchTerm || filterType) && (
                  <button
                    className="mt-4 px-4 py-2 text-blue-600 hover:underline flex items-center mx-auto"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("");
                    }}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// NoResultsMessage component for empty states
const NoResultsMessage = ({
  searchTerm,
  filterType,
  hasData,
  onClearFilters,
}) => {
  return (
    <div className="p-8 text-center">
      <div className="mb-3">
        <Search className="mx-auto text-gray-400" size={36} />
      </div>
      <h3 className="text-base font-medium text-gray-800 mb-1">
        No Results Found
      </h3>
      <p className="text-sm text-gray-500">
        {hasData
          ? "Try adjusting your search or filter criteria."
          : "No data available for this section."}
      </p>
      {(searchTerm || filterType) && (
        <button
          className="mt-3 px-3 py-1 text-sm text-blue-600 hover:underline flex items-center mx-auto"
          onClick={onClearFilters}
        >
          <RefreshCw size={14} className="mr-1" />
          Clear filters
        </button>
      )}
    </div>
  );
};

// Helper function to get icon for node types
const getNodeIcon = (type) => {
  switch (type) {
    case "Central Office":
    case "Central Department":
      return <Building className="text-blue-600" size={18} />;
    case "Faculty":
      return <Briefcase className="text-green-600" size={18} />;
    case "Campus":
      return <School className="text-purple-600" size={18} />;
    case "Department":
      return <Book className="text-orange-600" size={18} />;
    case "Personnel":
      return <User className="text-gray-600" size={18} />;
    case "Program":
    case "Programs Group":
      return <Book className="text-indigo-600" size={18} />;
    default:
      return <ChevronRight size={18} />;
  }
};

// TreeNode component for rendering each node in the tree
const TreeNode = ({
  node,
  level = 0,
  defaultOpen = false,
  searchTerm = "",
}) => {
  const [isOpen, setIsOpen] = useState(level < 1 || defaultOpen);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setIsOpen(level < 1 || defaultOpen);
  }, [defaultOpen, level]);

  useEffect(() => {
    // Auto-expand nodes that match search
    if (
      searchTerm &&
      node.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      setIsOpen(true);
    }
  }, [searchTerm, node.name]);

  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = `${(level + 1) * 16}px`;

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  // Highlight matching text
  const highlightMatch = (text) => {
    if (!searchTerm || !text) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Define node color based on type for better visual differentiation
  const getNodeTypeColor = (type) => {
    switch (type) {
      case "Central Office":
      case "Central Department":
        return "text-blue-600 border-blue-200";
      case "Faculty":
        return "text-green-600 border-green-200";
      case "Campus":
        return "text-purple-600 border-purple-200";
      case "Department":
        return "text-orange-600 border-orange-200";
      case "Personnel":
        return "text-gray-600 border-gray-200";
      case "Program":
      case "Programs Group":
        return "text-indigo-600 border-indigo-200";
      default:
        return "text-gray-800 border-gray-200";
    }
  };

  const nodeColor = getNodeTypeColor(node.type);
  const matchesSearch =
    searchTerm && node.name?.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="select-none mb-1">
      <div
        className={`flex items-center py-2 px-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors ${
          matchesSearch ? "bg-yellow-50" : ""
        }`}
        onClick={toggleNode}
        style={{ paddingLeft }}
      >
        <div className="flex items-center">
          {hasChildren ? (
            isOpen ? (
              <ChevronDown size={18} className="text-gray-500" />
            ) : (
              <ChevronRight size={18} className="text-gray-500" />
            )
          ) : (
            <span className="w-5" />
          )}
        </div>

        <div className="ml-1 mr-2">{getNodeIcon(node.type)}</div>

        <div className="flex-grow">
          <div className="font-medium">{highlightMatch(node.name)}</div>
          <div className={`text-xs ${nodeColor}`}>{node.type}</div>
        </div>

        {Object.keys(node).some(
          (key) =>
            !["id", "name", "type", "children"].includes(key) && node[key]
        ) && (
          <button
            className="ml-2 text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            onClick={toggleDetails}
          >
            {showDetails ? "Hide" : "Details"}
          </button>
        )}
      </div>

      {showDetails && (
        <div
          className="my-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm"
          style={{ marginLeft: parseInt(paddingLeft) + 24 + "px" }}
        >
          <h4 className="font-medium text-gray-700 mb-2">Node Details</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(node).map(([key, value]) => {
              if (!["id", "name", "type", "children"].includes(key) && value) {
                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());

                return (
                  <div key={key} className="flex">
                    <span className="font-medium text-gray-600 min-w-32">
                      {formattedKey}:
                    </span>
                    <span className="text-gray-800 ml-2">{value}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {isOpen && hasChildren && (
        <div className="transition-all">
          {node.children.map((child) => (
            <AnimatedElement>
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                defaultOpen={defaultOpen}
                searchTerm={searchTerm}
              />
            </AnimatedElement>
          ))}
        </div>
      )}
    </div>
  );
};
