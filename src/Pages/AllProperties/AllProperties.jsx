import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaSortAmountDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    axiosSecure
      .get("/properties")
      .then((res) => {
        setProperties(res.data);
        setFilteredProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  useEffect(() => {
    let filtered = [...properties];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered = sortProperties(filtered, sortOption);

    setFilteredProperties(filtered);
  }, [searchTerm, properties, sortOption]);

  const sortProperties = (properties, option) => {
    switch (option) {
      case "price-low-high":
        return [...properties].sort((a, b) => a.minPrice - b.minPrice);
      case "price-high-low":
        return [...properties].sort((a, b) => b.maxPrice - a.maxPrice);
      case "price-range-low":
        return [...properties].sort((a, b) => (a.maxPrice - a.minPrice) - (b.maxPrice - b.minPrice));
      case "price-range-high":
        return [...properties].sort((a, b) => (b.maxPrice - b.minPrice) - (a.maxPrice - a.minPrice));
      default:
        return properties;
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">Explore Properties</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>

      {/* Search and Sort Controls */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm("")}
            >
              <FaTimesCircle className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-gray-400" />
            <select
              className="select select-bordered w-full max-w-xs"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default Sorting</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="price-range-low">Price Range: Narrowest</option>
              <option value="price-range-high">Price Range: Widest</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {filteredProperties.length} properties found
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            No properties found matching your criteria.
          </h3>
          {(searchTerm || sortOption !== "default") && (
            <button
              className="mt-4 btn btn-primary"
              onClick={() => {
                setSearchTerm("");
                setSortOption("default");
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => {
            const {
              _id,
              image,
              title,
              location,
              agentImage,
              agentName,
              status,
              minPrice,
              maxPrice,
            } = property;

            return (
              <div
                key={_id}
                className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 badge badge-primary badge-lg">
                    ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="text-sm">{location}</span>
                  </div>

                  <div className="flex items-center gap-4 my-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={agentImage} alt={agentName} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{agentName}</p>
                      <p className="text-sm flex items-center gap-1">
                        {status === "verified" ? (
                          <>
                            <FaCheckCircle className="text-success" />
                            <span className="text-success">Verified</span>
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="text-error" />
                            <span className="text-error">Not Verified</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link to={`/properties/${_id}`}>
                      <button className="btn btn-primary btn-block hover:btn-secondary transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProperties;