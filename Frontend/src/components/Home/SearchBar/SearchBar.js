// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const urlQuery = searchParams.get("query");
//     if (urlQuery) {
//       setQuery(urlQuery);
//       performSearch(urlQuery);
//     }
//   }, [location.search]);

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value;
//     setQuery(searchTerm);

//     // Create a new URLSearchParams object
//     const searchParams = new URLSearchParams();

//     // Only set the "query" parameter if searchTerm is not empty
//     if (searchTerm) {
//       searchParams.set("query", searchTerm);
//     }

//     // Update the URL with only the "query" parameter
//     navigate(`/search?${searchParams.toString()}`, { replace: true });

//     if (searchTerm.trim().length > 2) {
//       performSearch(searchTerm);
//     } else {
//       setResults([]);
//     }
//   };

//   const performSearch = async (searchTerm) => {
//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/search?query=${encodeURIComponent(searchTerm)}`
//       );
//       const data = await response.json();
//       console.log("data", data);
//       setResults(data.results || []);
//     } catch (error) {
//       console.error("Search failed:", error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     // Navigate based on result type
//     switch (result.type) {
//       case "personnel":
//         navigate(`/personnel/${result.id}`);
//         break;
//       case "department":
//         navigate(`/department/${result.id}`);
//         break;
//       case "central_department":
//         navigate(`/central-department/${result.id}`);
//         break;
//       case "campus":
//         navigate(`/campus/${result.id}`);
//         break;
//       case "faculty":
//         navigate(`/faculty/${result.id}`);
//         break;
//       case "program":
//         navigate(`/program/${result.id}`);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="relative">
//         <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
//         <input
//           type="text"
//           id="search-navbar"
//           className="w-full rounded-2xl bg-white/80 py-3 pl-12 pr-4 text-lg text-black outline-none placeholder:text-gray-500"
//           placeholder="Search personnel, departments, campuses..."
//           value={query}
//           onChange={handleSearch}
//           onFocus={() => {
//             if (results.length > 0) setShowResults(true);
//           }}
//         />
//         {isSearching && (
//           <div className="absolute right-4 top-1/2 -translate-y-1/2">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
//           </div>
//         )}
//       </div>

//       {showResults && results.length > 0 && (
//         <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
//           <ul className="max-h-96 overflow-auto py-1">
//             {results.map((result) => (
//               <li
//                 key={`${result.type}-${result.id}`}
//                 className="cursor-pointer px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleResultClick(result)}
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <div className="font-medium">{result.name}</div>
//                     <div className="text-sm text-gray-600">
//                       {result.position && <span>{result.position}</span>}
//                       {result.email && (
//                         <span className="ml-2">{result.email}</span>
//                       )}
//                     </div>
//                     {result.affiliation && (
//                       <div className="text-xs text-gray-500">
//                         {result.affiliation}
//                       </div>
//                     )}
//                   </div>
//                   <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
//                     {result.type === "central_department"
//                       ? "Central Dept"
//                       : result.type.charAt(0).toUpperCase() +
//                         result.type.slice(1)}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {showResults &&
//         query.trim() !== "" &&
//         results.length === 0 &&
//         !isSearching && (
//           <div className="absolute z-50 mt-1 w-full rounded-md bg-white p-4 shadow-lg">
//             <p className="text-center text-gray-500">No results found</p>
//           </div>
//         )}
//     </div>
//   );
// };

// export default SearchBar;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FaSearch,
//   FaChevronDown,
//   FaChevronRight,
//   FaBuilding,
//   FaUniversity,
//   FaUsers,
//   FaUser,
//   FaBookOpen,
// } from "react-icons/fa";

// const HierarchicalSearchResults = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [groupedResults, setGroupedResults] = useState({});
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [expandedGroups, setExpandedGroups] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const urlQuery = searchParams.get("query");
//     if (urlQuery) {
//       setQuery(urlQuery);
//       performSearch(urlQuery);
//     }
//   }, [location.search]);

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value;
//     setQuery(searchTerm);

//     const searchParams = new URLSearchParams();
//     if (searchTerm) {
//       searchParams.set("query", searchTerm);
//     }

//     // navigate(`/search?${searchParams.toString()}`, { replace: true });

//     if (searchTerm.trim().length > 2) {
//       performSearch(searchTerm);
//     } else {
//       setResults([]);
//       setGroupedResults({});
//     }
//   };

//   const performSearch = async (searchTerm) => {
//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/search?query=${encodeURIComponent(searchTerm)}`
//       );
//       const data = await response.json();
//       const searchResults = data.results || [];
//       setResults(searchResults);

//       // Group results by type
//       const grouped = searchResults.reduce((acc, result) => {
//         const type = result.type;
//         if (!acc[type]) {
//           acc[type] = [];
//         }
//         acc[type].push(result);
//         return acc;
//       }, {});

//       setGroupedResults(grouped);

//       // Initialize expanded state for new groups
//       const newExpandedGroups = {};
//       Object.keys(grouped).forEach((group) => {
//         newExpandedGroups[group] =
//           expandedGroups[group] !== undefined ? expandedGroups[group] : true;
//       });
//       setExpandedGroups(newExpandedGroups);

//       if (searchResults.length > 0) {
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error("Search failed:", error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     // Navigate based on result type
//     switch (result.type) {
//       case "personnel":
//         navigate(`/personnel/${result.id}`);
//         break;
//       case "department":
//         navigate(`/department/${result.id}`);
//         break;
//       case "central_department":
//         navigate(`/central-department/${result.id}`);
//         break;
//       case "campus":
//         navigate(`/campus/${result.id}`);
//         break;
//       case "faculty":
//         navigate(`/faculty/${result.id}`);
//         break;
//       case "program":
//         navigate(`/program/${result.id}`);
//         break;
//       default:
//         break;
//     }
//   };

//   const toggleGroup = (group) => {
//     setExpandedGroups({
//       ...expandedGroups,
//       [group]: !expandedGroups[group],
//     });
//   };

//   const getGroupIcon = (group) => {
//     switch (group) {
//       case "personnel":
//         return <FaUser className="mr-2 text-blue-500" />;
//       case "department":
//         return <FaUsers className="mr-2 text-green-500" />;
//       case "central_department":
//         return <FaBuilding className="mr-2 text-purple-500" />;
//       case "campus":
//         return <FaUniversity className="mr-2 text-orange-500" />;
//       case "faculty":
//         return <FaUsers className="mr-2 text-red-500" />;
//       case "program":
//         return <FaBookOpen className="mr-2 text-indigo-500" />;
//       default:
//         return null;
//     }
//   };

//   const getGroupTitle = (group) => {
//     switch (group) {
//       case "central_department":
//         return "Central Departments";
//       default:
//         return group.charAt(0).toUpperCase() + group.slice(1) + "s";
//     }
//   };

//   const renderResultItem = (result) => {
//     return (
//       <li
//         key={`${result.type}-${result.id}`}
//         className="cursor-pointer px-4 py-2 pl-10 hover:bg-gray-100"
//         onClick={() => handleResultClick(result)}
//       >
//         <div className="flex items-start justify-between">
//           <div>
//             <div className="font-medium">{result.name}</div>
//             <div className="text-sm text-gray-600">
//               {result.position && <span>{result.position}</span>}
//               {result.email && <span className="ml-2">{result.email}</span>}
//             </div>
//             {result.affiliation && (
//               <div className="text-xs text-gray-500">{result.affiliation}</div>
//             )}
//           </div>
//           {/* <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
//             ID: {result.id}
//           </span> */}
//         </div>
//       </li>
//     );
//   };

//   const renderHierarchicalResults = () => {
//     // Define the display order of groups
//     const groupOrder = [
//       "central_office",
//       "faculty",
//       "central_department",
//       "campus",
//       "department",
//       "program",
//       "personnel",
//     ];

//     return (
//       <ul className="divide-y divide-gray-200">
//         {groupOrder.map((group) => {
//           if (!groupedResults[group] || groupedResults[group].length === 0)
//             return null;

//           return (
//             <li key={group} className="py-1">
//               <div
//                 className="flex cursor-pointer items-center px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
//                 onClick={() => toggleGroup(group)}
//               >
//                 {expandedGroups[group] ? (
//                   <FaChevronDown className="mr-2 text-gray-500" />
//                 ) : (
//                   <FaChevronRight className="mr-2 text-gray-500" />
//                 )}
//                 {getGroupIcon(group)}
//                 <span>
//                   {getGroupTitle(group)} ({groupedResults[group].length})
//                 </span>
//               </div>

//               {expandedGroups[group] && (
//                 <ul className="bg-gray-50">
//                   {groupedResults[group].map((result) =>
//                     renderResultItem(result)
//                   )}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   return (
//     <div className="relative">
//       <div className="relative">
//         <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
//         <input
//           type="text"
//           id="search-navbar"
//           className="w-full rounded-2xl bg-white/80 py-3 pl-12 pr-4 text-lg text-black outline-none placeholder:text-gray-500"
//           placeholder="Search personnel, departments, campuses..."
//           value={query}
//           onChange={handleSearch}
//           onFocus={() => {
//             if (results.length > 0) setShowResults(true);
//           }}
//         />
//         {isSearching && (
//           <div className="absolute right-4 top-1/2 -translate-y-1/2">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
//           </div>
//         )}
//       </div>

//       {showResults && results.length > 0 && (
//         <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
//           <div className="max-h-96 overflow-auto">
//             {renderHierarchicalResults()}
//           </div>
//         </div>
//       )}

//       {showResults &&
//         query.trim() !== "" &&
//         results.length === 0 &&
//         !isSearching && (
//           <div className="absolute z-50 mt-1 w-full rounded-md bg-white p-4 shadow-lg">
//             <p className="text-center text-gray-500">No results found</p>
//           </div>
//         )}
//     </div>
//   );
// };

// export default HierarchicalSearchResults;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FaSearch,
//   FaArrowRight,
//   FaBuilding,
//   FaUniversity,
//   FaUsers,
//   FaUser,
//   FaBookOpen,
// } from "react-icons/fa";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [selectedResult, setSelectedResult] = useState(null);
//   const [hierarchyData, setHierarchyData] = useState(null);
//   const [isLoadingHierarchy, setIsLoadingHierarchy] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const urlQuery = searchParams.get("query");
//     if (urlQuery) {
//       setQuery(urlQuery);
//       performSearch(urlQuery);
//     }
//   }, [location.search]);

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value;
//     setQuery(searchTerm);

//     // Create a new URLSearchParams object
//     const searchParams = new URLSearchParams();

//     // Only set the "query" parameter if searchTerm is not empty
//     if (searchTerm) {
//       searchParams.set("query", searchTerm);
//     }

//     // Update the URL with only the "query" parameter
//     // navigate(`/search?${searchParams.toString()}`, { replace: true });

//     if (searchTerm.trim().length > 2) {
//       performSearch(searchTerm);
//     } else {
//       setResults([]);
//     }

//     // Clear any selected result when performing a new search
//     setSelectedResult(null);
//     setHierarchyData(null);
//   };

//   const performSearch = async (searchTerm) => {
//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/search?query=${encodeURIComponent(searchTerm)}`
//       );
//       const data = await response.json();
//       setResults(data.results || []);
//     } catch (error) {
//       console.error("Search failed:", error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleResultClick = async (result) => {
//     setSelectedResult(result);
//     setShowResults(false);
//     setIsLoadingHierarchy(true);

//     try {
//       // This endpoint is implemented in the backend code above
//       const response = await fetch(
//         `http://localhost:5000/search/hierarchy?type=${result.type}&id=${result.id}`
//       );
//       const data = await response.json();
//       setHierarchyData(data.hierarchy);
//     } catch (error) {
//       console.error("Failed to fetch hierarchy:", error);
//     } finally {
//       setIsLoadingHierarchy(false);
//     }
//   };

//   const getIconForType = (type) => {
//     switch (type) {
//       case "central_office":
//         return <FaBuilding className="text-purple-600" />;
//       case "faculty":
//         return <FaUsers className="text-red-500" />;
//       case "central_department":
//         return <FaBuilding className="text-blue-600" />;
//       case "campus":
//         return <FaUniversity className="text-orange-500" />;
//       case "department":
//         return <FaUsers className="text-green-500" />;
//       case "personnel":
//         return <FaUser className="text-blue-500" />;
//       case "program":
//         return <FaBookOpen className="text-indigo-500" />;
//       default:
//         return null;
//     }
//   };

//   const getLabelForType = (type) => {
//     switch (type) {
//       case "central_office":
//         return "Central Office";
//       case "faculty":
//         return "Faculty";
//       case "central_department":
//         return "Central Department";
//       case "campus":
//         return "Campus";
//       case "department":
//         return "Department";
//       case "personnel":
//         return "Personnel";
//       case "program":
//         return "Program";
//       default:
//         return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ");
//     }
//   };

//   const renderHierarchyView = () => {
//     if (!hierarchyData) {
//       if (isLoadingHierarchy) {
//         return (
//           <div className="mt-4 flex justify-center rounded-md bg-white p-8 shadow-md">
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
//             <span className="ml-2">Loading hierarchy data...</span>
//           </div>
//         );
//       }
//       return (
//         <div className="mt-4 rounded-md bg-white p-4 shadow-md">
//           <p className="text-center text-gray-500">
//             No hierarchy data available
//           </p>
//         </div>
//       );
//     }

//     // Define the hierarchy levels in the correct order
//     const hierarchyLevels = [
//       "central_office",
//       "faculty",
//       "central_department",
//       "campus",
//       "department",
//       "program",
//       "personnel",
//     ];

//     // Filter out levels that don't exist in this hierarchy
//     const availableLevels = hierarchyLevels.filter(
//       (level) => hierarchyData[level]
//     );

//     return (
//       <div className="mt-4 rounded-md bg-white p-6 shadow-md">
//         <h3 className="mb-6 text-xl font-semibold text-gray-800">
//           Hierarchical View
//         </h3>

//         {/* Tree-like structure */}
//         <div className="relative space-y-8 pl-12">
//           {/* Vertical line connecting all elements */}
//           <div className="absolute bottom-8 left-4 top-2 w-0.5 bg-gray-300"></div>

//           {availableLevels.map((level, index) => {
//             const item = hierarchyData[level];
//             const isLast = index === availableLevels.length - 1;

//             return (
//               <div key={level} className="relative">
//                 {/* Horizontal connector line */}
//                 <div className="absolute -left-8 top-4 h-0.5 w-8 bg-gray-300"></div>

//                 <div className="flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
//                   <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
//                     {getIconForType(level)}
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium uppercase text-gray-500">
//                       {getLabelForType(level)}
//                     </div>
//                     <div className="text-lg font-medium text-gray-800">
//                       {item.name}
//                     </div>
//                     {item.position && (
//                       <div className="text-sm text-gray-600">
//                         {item.position}
//                       </div>
//                     )}
//                     {item.location && (
//                       <div className="text-sm text-gray-600">
//                         {item.location}
//                       </div>
//                     )}
//                     {item.contact && (
//                       <div className="text-sm text-gray-600">
//                         {item.contact}
//                       </div>
//                     )}
//                     {item.email && (
//                       <div className="text-sm text-gray-600">{item.email}</div>
//                     )}
//                   </div>
//                   <div className="ml-auto flex flex-col items-end">
//                     <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
//                       ID: {item.id}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="relative">
//       <div className="relative">
//         <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
//         <input
//           type="text"
//           id="search-navbar"
//           className="w-full rounded-2xl bg-white/80 py-3 pl-12 pr-4 text-lg text-black outline-none placeholder:text-gray-500"
//           placeholder="Search personnel, departments, campuses..."
//           value={query}
//           onChange={handleSearch}
//           onFocus={() => {
//             if (results.length > 0) setShowResults(true);
//           }}
//         />
//         {isSearching && (
//           <div className="absolute right-4 top-1/2 -translate-y-1/2">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
//           </div>
//         )}
//       </div>

//       {showResults && results.length > 0 && (
//         <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
//           <ul className="max-h-96 overflow-auto py-1">
//             {results.map((result) => (
//               <li
//                 key={`${result.type}-${result.id}`}
//                 className="cursor-pointer px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleResultClick(result)}
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <div className="font-medium">{result.name}</div>
//                     <div className="text-sm text-gray-600">
//                       {result.position && <span>{result.position}</span>}
//                       {result.email && (
//                         <span className="ml-2">{result.email}</span>
//                       )}
//                     </div>
//                     {result.affiliation && (
//                       <div className="text-xs text-gray-500">
//                         {result.affiliation}
//                       </div>
//                     )}
//                   </div>
//                   <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
//                     {result.type === "central_department"
//                       ? "Central Dept"
//                       : result.type.charAt(0).toUpperCase() +
//                         result.type.slice(1)}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {showResults &&
//         query.trim() !== "" &&
//         results.length === 0 &&
//         !isSearching && (
//           <div className="absolute z-50 mt-1 w-full rounded-md bg-white p-4 shadow-lg">
//             <p className="text-center text-gray-500">No results found</p>
//           </div>
//         )}

//       {selectedResult && renderHierarchyView()}

//       {selectedResult && (
//         <div className="mt-4 flex justify-end">
//           <button
//             className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
//             onClick={() => {
//               setSelectedResult(null);
//               setHierarchyData(null);
//               setShowResults(true);
//             }}
//           >
//             Back to Search Results
//           </button>
//           <button
//             className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             onClick={() => {
//               // Navigate to the detail page
//               switch (selectedResult.type) {
//                 case "personnel":
//                   navigate(`/personnel/${selectedResult.id}`);
//                   break;
//                 case "department":
//                   navigate(`/department/${selectedResult.id}`);
//                   break;
//                 case "central_department":
//                   navigate(`/central-department/${selectedResult.id}`);
//                   break;
//                 case "campus":
//                   navigate(`/campus/${selectedResult.id}`);
//                   break;
//                 case "faculty":
//                   navigate(`/faculty/${selectedResult.id}`);
//                   break;
//                 case "program":
//                   navigate(`/program/${selectedResult.id}`);
//                   break;
//                 default:
//                   break;
//               }
//             }}
//           >
//             View Details
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

"use client";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaChevronRight,
  FaArrowRight,
  FaBuilding,
  FaUniversity,
  FaUsers,
  FaUser,
  FaBookOpen,
  FaFilter,
} from "react-icons/fa";

const HierarchicalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [groupedResults, setGroupedResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);
  const [hierarchyData, setHierarchyData] = useState(null);
  const [isLoadingHierarchy, setIsLoadingHierarchy] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Define all available filter types
  const filterTypes = [
    {
      id: "personnel",
      label: "Personnel",
      icon: <FaUser className="text-blue-500" />,
    },
    {
      id: "department",
      label: "Department",
      icon: <FaUsers className="text-green-500" />,
    },
    {
      id: "central_department",
      label: "Central Department",
      icon: <FaBuilding className="text-blue-600" />,
    },
    {
      id: "campus",
      label: "Campus",
      icon: <FaUniversity className="text-orange-500" />,
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: <FaUsers className="text-red-500" />,
    },
    {
      id: "program",
      label: "Program",
      icon: <FaBookOpen className="text-indigo-500" />,
    },
    {
      id: "central_office",
      label: "Central Office",
      icon: <FaBuilding className="text-purple-600" />,
    },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams.get("query");
    if (urlQuery) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    const searchParams = new URLSearchParams();
    if (searchTerm) {
      searchParams.set("query", searchTerm);
    }

    if (searchTerm.trim().length > 2) {
      performSearch(searchTerm);
    } else {
      setResults([]);
      setGroupedResults({});
    }

    // Clear any selected result when performing a new search
    setSelectedResult(null);
    setHierarchyData(null);
  };

  const performSearch = async (searchTerm) => {
    setIsSearching(true);
    try {
      // Add filters to the search query if there are any active filters
      let url = `http://localhost:5000/search?query=${encodeURIComponent(
        searchTerm
      )}`;
      if (activeFilters.length > 0) {
        url += `&filters=${encodeURIComponent(activeFilters.join(","))}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      const searchResults = data.results || [];

      // Apply filters client-side as well in case server doesn't support filtering
      const filteredResults =
        activeFilters.length > 0
          ? searchResults.filter((result) =>
              activeFilters.includes(result.type)
            )
          : searchResults;

      setResults(filteredResults);

      // Group results by type
      const grouped = filteredResults.reduce((acc, result) => {
        const type = result.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(result);
        return acc;
      }, {});

      setGroupedResults(grouped);

      // Initialize expanded state for new groups
      const newExpandedGroups = {};
      Object.keys(grouped).forEach((group) => {
        newExpandedGroups[group] =
          expandedGroups[group] !== undefined ? expandedGroups[group] : true;
      });
      setExpandedGroups(newExpandedGroups);

      if (filteredResults.length > 0) {
        setShowResults(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = async (result) => {
    setSelectedResult(result);
    setShowResults(false);
    setIsLoadingHierarchy(true);

    try {
      // Fetch hierarchy data
      const response = await fetch(
        `http://localhost:5000/search/hierarchy?type=${result.type}&id=${result.id}`
      );
      const data = await response.json();

      // Fix for personnel showing only one level up
      if (result.type === "personnel") {
        try {
          // Request complete hierarchy for personnel
          const fullHierarchyResponse = await fetch(
            `http://localhost:5000/search/full-hierarchy?type=${result.type}&id=${result.id}`
          );
          const fullData = await fullHierarchyResponse.json();

          if (fullData && fullData.hierarchy) {
            setHierarchyData(fullData.hierarchy);
          } else if (data && data.hierarchy) {
            // Fallback to original hierarchy data
            setHierarchyData(data.hierarchy);
          } else {
            // Create a minimal hierarchy with just the personnel data
            // This ensures something is always shown
            setHierarchyData({
              personnel: {
                id: result.id,
                name: result.name,
                position: result.position,
                email: result.email,
              },
            });
          }
        } catch (error) {
          console.error("Failed to fetch full hierarchy:", error);
          // Fallback to original data or minimal hierarchy
          if (data && data.hierarchy) {
            setHierarchyData(data.hierarchy);
          } else {
            setHierarchyData({
              personnel: {
                id: result.id,
                name: result.name,
                position: result.position,
                email: result.email,
              },
            });
          }
        }
      } else {
        setHierarchyData(data.hierarchy);
      }
    } catch (error) {
      console.error("Failed to fetch hierarchy:", error);
      // Create a minimal hierarchy with just the selected result
      setHierarchyData({
        [result.type]: {
          id: result.id,
          name: result.name,
          position: result.position,
          email: result.email,
        },
      });
    } finally {
      setIsLoadingHierarchy(false);
    }
  };

  const navigateToDetailPage = (result) => {
    // Navigate based on result type
    switch (result.type) {
      case "personnel":
        navigate(`/personnel/${result.id}`);
        break;
      case "department":
        navigate(`/department/${result.id}`);
        break;
      case "central_department":
        navigate(`/central-department/${result.id}`);
        break;
      case "campus":
        navigate(`/campus/${result.id}`);
        break;
      case "faculty":
        navigate(`/faculty/${result.id}`);
        break;
      case "program":
        navigate(`/program/${result.id}`);
        break;
      default:
        break;
    }
  };

  const toggleGroup = (group) => {
    setExpandedGroups({
      ...expandedGroups,
      [group]: !expandedGroups[group],
    });
  };

  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter((id) => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }

    // Rerun search with new filters if we have a query
    if (query.trim().length > 2) {
      performSearch(query);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    if (query.trim().length > 2) {
      performSearch(query);
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case "central_office":
        return <FaBuilding className="text-purple-600" />;
      case "faculty":
        return <FaUsers className="text-red-500" />;
      case "central_department":
        return <FaBuilding className="text-blue-600" />;
      case "campus":
        return <FaUniversity className="text-orange-500" />;
      case "department":
        return <FaUsers className="text-green-500" />;
      case "personnel":
        return <FaUser className="text-blue-500" />;
      case "program":
        return <FaBookOpen className="text-indigo-500" />;
      default:
        return null;
    }
  };

  const getGroupTitle = (group) => {
    switch (group) {
      case "central_department":
        return "Central Departments";
      case "central_office":
        return "Central Office";
      default:
        return group.charAt(0).toUpperCase() + group.slice(1) + "s";
    }
  };

  const getLabelForType = (type) => {
    switch (type) {
      case "central_office":
        return "Central Office";
      case "faculty":
        return "Faculty";
      case "central_department":
        return "Central Department";
      case "campus":
        return "Campus";
      case "department":
        return "Department";
      case "personnel":
        return "Personnel";
      case "program":
        return "Program";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ");
    }
  };

  const renderResultItem = (result) => {
    return (
      <li
        key={`${result.type}-${result.id}`}
        className="cursor-pointer px-4 py-2 pl-10 hover:bg-gray-100"
        onClick={() => handleResultClick(result)}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">{result.name}</div>
            <div className="text-sm text-gray-600">
              {result.position && <span>{result.position}</span>}
              {result.email && <span className="ml-2">{result.email}</span>}
            </div>
            {result.affiliation && (
              <div className="text-xs text-gray-500">{result.affiliation}</div>
            )}
          </div>
          <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
            {result.type === "central_department"
              ? "Central Dept"
              : result.type.charAt(0).toUpperCase() + result.type.slice(1)}
          </span>
        </div>
      </li>
    );
  };

  const renderHierarchicalResults = () => {
    // Define the display order of groups
    const groupOrder = [
      "central_office",
      "faculty",
      "central_department",
      "campus",
      "department",
      "program",
      "personnel",
    ];

    return (
      <ul className="divide-y divide-gray-200">
        {groupOrder.map((group) => {
          if (!groupedResults[group] || groupedResults[group].length === 0)
            return null;

          return (
            <li key={group} className="py-1">
              <div
                className="flex cursor-pointer items-center px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => toggleGroup(group)}
              >
                {expandedGroups[group] ? (
                  <FaChevronDown className="mr-2 text-gray-500" />
                ) : (
                  <FaChevronRight className="mr-2 text-gray-500" />
                )}
                {getIconForType(group)}
                <span className="ml-2">
                  {getGroupTitle(group)} ({groupedResults[group].length})
                </span>
              </div>

              {expandedGroups[group] && (
                <ul className="bg-gray-50">
                  {groupedResults[group].map((result) =>
                    renderResultItem(result)
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderHierarchyView = () => {
    if (!hierarchyData) {
      if (isLoadingHierarchy) {
        return (
          <div className="mt-4 flex justify-center rounded-md bg-white p-8 shadow-md">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <span className="ml-2">Loading hierarchy data...</span>
          </div>
        );
      }
      return (
        <div className="mt-4 rounded-md bg-white p-4 shadow-md">
          <p className="text-center text-gray-500">
            No hierarchy data available
          </p>
        </div>
      );
    }

    // Define the hierarchy levels in the correct order
    const hierarchyLevels = [
      "central_office",
      "faculty",
      "central_department",
      "campus",
      "department",
      "program",
      "personnel",
    ];

    // Filter out levels that don't exist in this hierarchy
    const availableLevels = hierarchyLevels.filter(
      (level) => hierarchyData[level]
    );

    return (
      <div className="mt-4 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-6 border-b pb-2 text-xl font-semibold text-gray-800">
          Organizational Hierarchy
        </h3>

        {/* Fixed Tree-like structure with proper connectors */}
        <div className="relative">
          {availableLevels.map((level, index) => {
            const item = hierarchyData[level];
            const isLast = index === availableLevels.length - 1;

            return (
              <div
                key={level}
                className="relative mb-8 pl-12"
                style={{
                  marginLeft: `${index * 20}px`,
                }}
              >
                {/* Connector lines - These are now properly positioned */}
                {index > 0 && (
                  <>
                    {/* Vertical line from previous node */}
                    <div
                      className="absolute bg-gray-300"
                      style={{
                        width: "2px",
                        height: "12px",
                        left: "0",
                        top: "-12px",
                      }}
                    ></div>
                    {/* Horizontal line to current node */}
                    <div
                      className="absolute bg-gray-300"
                      style={{
                        height: "2px",
                        width: "12px",
                        left: "0",
                        top: "24px",
                      }}
                    ></div>
                    {/* Vertical line to current node */}
                    <div
                      className="absolute bg-gray-300"
                      style={{
                        width: "2px",
                        height: "24px",
                        left: "12px",
                        top: "0",
                      }}
                    ></div>
                  </>
                )}

                {/* Connector for next item if this isn't the last item */}
                {!isLast && (
                  <div
                    className="absolute bg-gray-300"
                    style={{
                      width: "2px",
                      height: index === 0 ? "100%" : "calc(100% - 24px)",
                      left: "0",
                      top: "48px",
                    }}
                  ></div>
                )}

                {/* Item box */}
                <div
                  className={`
                  relative rounded-lg border p-4 shadow-sm
                  ${
                    index === 0
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-200 bg-white"
                  }
                `}
                >
                  <div className="flex items-center">
                    {/* Icon with appropriate background */}
                    <div
                      className={`
                      flex h-10 w-10 items-center justify-center rounded-full
                      ${index === 0 ? "bg-gray-200" : "bg-gray-100"}
                    `}
                    >
                      {getIconForType(level)}
                    </div>

                    <div className="ml-4 flex-grow">
                      <div className="text-xs font-medium uppercase text-gray-500">
                        {getLabelForType(level)}
                      </div>
                      <div
                        className={`
                        font-medium 
                        ${
                          index === 0
                            ? "text-lg text-gray-800"
                            : "text-md text-gray-700"
                        }
                      `}
                      >
                        {item.name}
                      </div>
                      {item.position && (
                        <div className="text-sm text-gray-600">
                          {item.position}
                        </div>
                      )}
                      {item.location && (
                        <div className="text-sm text-gray-600">
                          {item.location}
                        </div>
                      )}
                      {item.contact && (
                        <div className="text-sm text-gray-600">
                          {item.contact}
                        </div>
                      )}
                      {item.email && (
                        <div className="text-sm text-gray-600">
                          {item.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFilterOptions = () => {
    return (
      <div className="absolute z-50 mt-1 w-64 rounded-md bg-white shadow-lg border border-gray-100 p-2">
        <div className="flex justify-between items-center mb-2 border-b pb-2">
          <h4 className="font-medium text-gray-700">Filter by Type</h4>
          <button
            className="text-xs text-blue-500 hover:text-blue-700"
            onClick={clearAllFilters}
          >
            Clear all
          </button>
        </div>
        <div className="space-y-2">
          {filterTypes.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => toggleFilter(filter.id)}
            >
              <input
                type="checkbox"
                id={`filter-${filter.id}`}
                checked={activeFilters.includes(filter.id)}
                onChange={() => {}} // Handle in the parent div onClick
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`filter-${filter.id}`}
                className="flex items-center cursor-pointer text-gray-700 text-sm"
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="relative mb-4">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="search-navbar"
            className="w-full rounded-2xl border border-gray-200 bg-white/90 py-3 pl-12 pr-4 text-lg text-black outline-none shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-150 placeholder:text-gray-500"
            placeholder="Search personnel, departments, campuses..."
            value={query}
            onChange={handleSearch}
            onFocus={() => {
              if (results.length > 0) setShowResults(true);
            }}
          />

          {/* Filter button */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            {isSearching ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent mr-2"></div>
            ) : (
              <button
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors ${
                  activeFilters.length > 0 ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <FaFilter />
                {activeFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Show active filters as chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map((filter) => {
              const filterInfo = filterTypes.find((f) => f.id === filter);
              return (
                <div
                  key={filter}
                  className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  <span className="mr-1">{filterInfo?.icon}</span>
                  {filterInfo?.label}
                  <button
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    onClick={() => toggleFilter(filter)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter options dropdown */}
        {showFilterOptions && renderFilterOptions()}
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-100">
          <div className="max-h-96 overflow-auto">
            {renderHierarchicalResults()}
          </div>
        </div>
      )}
      {showResults &&
        query.trim() !== "" &&
        results.length === 0 &&
        !isSearching && (
          <div className="absolute z-50 mt-1 w-full rounded-md bg-white p-4 shadow-lg border border-gray-100">
            <p className="text-center text-gray-500">No results found</p>
          </div>
        )}
      {selectedResult && renderHierarchyView()}
      {selectedResult && (
        <div className="mt-4 flex justify-end space-x-3">
          <button
            className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 border border-gray-200 transition duration-150 flex items-center"
            onClick={() => {
              setSelectedResult(null);
              setHierarchyData(null);
              setShowResults(true);
            }}
          >
            Back to Search Results
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 shadow-sm transition duration-150 flex items-center"
            onClick={() => navigateToDetailPage(selectedResult)}
          >
            <span className="flex items-center">
              View Details
              <FaArrowRight className="ml-2" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HierarchicalSearch;
