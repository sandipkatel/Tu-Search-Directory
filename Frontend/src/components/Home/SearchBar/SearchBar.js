import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

    // Create a new URLSearchParams object
    const searchParams = new URLSearchParams();

    // Only set the "query" parameter if searchTerm is not empty
    if (searchTerm) {
      searchParams.set("query", searchTerm);
    }

    // Update the URL with only the "query" parameter
    navigate(`/search?${searchParams.toString()}`, { replace: true });

    if (searchTerm.trim().length > 2) {
      performSearch(searchTerm);
    } else {
      setResults([]);
    }
  };

  const performSearch = async (searchTerm) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:5000/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      console.log("data", data);
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result) => {
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

  return (
    <div className="relative">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          id="search-navbar"
          className="w-full rounded-2xl bg-white/80 py-3 pl-12 pr-4 text-lg text-black outline-none placeholder:text-gray-500"
          placeholder="Search personnel, departments, campuses..."
          value={query}
          onChange={handleSearch}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-96 overflow-auto py-1">
            {results.map((result) => (
              <li
                key={`${result.type}-${result.id}`}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-gray-600">
                      {result.position && <span>{result.position}</span>}
                      {result.email && (
                        <span className="ml-2">{result.email}</span>
                      )}
                    </div>
                    {result.affiliation && (
                      <div className="text-xs text-gray-500">
                        {result.affiliation}
                      </div>
                    )}
                  </div>
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
                    {result.type === "central_department"
                      ? "Central Dept"
                      : result.type.charAt(0).toUpperCase() +
                        result.type.slice(1)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults &&
        query.trim() !== "" &&
        results.length === 0 &&
        !isSearching && (
          <div className="absolute z-50 mt-1 w-full rounded-md bg-white p-4 shadow-lg">
            <p className="text-center text-gray-500">No results found</p>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
