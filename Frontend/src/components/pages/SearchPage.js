import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get query from URL if present
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

    // Update URL with search query
    const searchParams = new URLSearchParams(location.search);
    if (searchTerm) {
      searchParams.set("query", searchTerm);
    } else {
      searchParams.delete("query");
    }
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
        `/api/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Tribhuvan University Directory Search
      </h1>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            id="search-input"
            className="w-full rounded-lg border border-gray-300 py-4 pl-12 pr-4 text-lg text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Search personnel, departments, campuses..."
            value={query}
            onChange={handleSearch}
            autoFocus
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <FaSearch className="h-5 w-5" />
          </div>
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-lg">{result.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.position && <span>{result.position}</span>}
                      {result.email && (
                        <span className={result.position ? "ml-2" : ""}>
                          {result.email}
                        </span>
                      )}
                    </div>
                    {result.affiliation && (
                      <div className="text-xs text-gray-500 mt-1">
                        {result.affiliation}
                      </div>
                    )}
                  </div>
                  <span className="ml-2 rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 whitespace-nowrap">
                    {result.type === "central_department"
                      ? "Central Dept"
                      : result.type.charAt(0).toUpperCase() +
                        result.type.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        query.trim().length > 2 &&
        !isSearching && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              No results found for "{query}"
            </p>
          </div>
        )
      )}

      {/* Initial State - No Search Yet */}
      {query.trim().length <= 2 && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Start typing to search the directory
          </p>
          <div className="mt-6 text-gray-600">
            <p>You can search for:</p>
            <ul className="mt-2">
              <li>Personnel by name or position</li>
              <li>Departments and central departments</li>
              <li>Campuses and faculties</li>
              <li>Programs and courses</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
