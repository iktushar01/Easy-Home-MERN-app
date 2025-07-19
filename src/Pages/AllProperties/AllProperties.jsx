import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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
    const filtered = properties.filter((property) =>
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">Explore Properties</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch  />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-900 rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
        <p className="text-sm text-gray-500 mt-2">
          {filteredProperties.length} properties found
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            No properties found matching your search.
          </h3>
          {searchTerm && (
            <button
              className="mt-4 btn btn-primary"
              onClick={() => setSearchTerm("")}
            >
              Clear search
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