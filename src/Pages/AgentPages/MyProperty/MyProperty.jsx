import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (!user?.email) return;
        
        const response = await axiosSecure.get(`/properties/agent/${user.email}`);
        setProperties(response.data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user?.email, axiosSecure]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await axiosSecure.delete(`/properties/${id}`);
        
        if (response.data.deletedCount > 0) {
          toast.success('Property deleted successfully');
          // Remove the deleted property from state
          setProperties(properties.filter(property => property._id !== id));
        }
      } catch (err) {
        toast.error('Failed to delete property');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">No Properties Found</h2>
        <p className="mt-2">You haven't added any properties yet.</p>
        <Link to="/dashboard/add-property" className="btn btn-primary mt-4">
          Add New Property
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link to="/dashboard/agent/add-property" className="btn btn-primary">
          Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{property.title}</h2>
              <p><span className="font-semibold">Location:</span> {property.location}</p>
              <p><span className="font-semibold">Price Range:</span> ${property.priceRange}</p>
              
              <div className="flex items-center mt-2">
                <div className="avatar mr-2">
                  <div className="w-8 rounded-full">
                    <img src={property.agentImage || "https://i.ibb.co/ccpPQNQC/Screenshot-2025-02-05-105300.png"} alt="Agent" />
                  </div>
                </div>
                <span>{property.agentName}</span>
              </div>

              <div className="mt-2">
                <span className={`badge ${
                  property.verificationStatus === 'verified' 
                    ? 'badge-success' 
                    : property.verificationStatus === 'rejected' 
                      ? 'badge-error' 
                      : 'badge-warning'
                }`}>
                  {property.verificationStatus === 'verified' ? (
                    <FaCheck className="mr-1" />
                  ) : property.verificationStatus === 'rejected' ? (
                    <FaTimes className="mr-1" />
                  ) : null}
                  {property.verificationStatus || 'pending'}
                </span>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link 
                  to={`/dashboard/update-property/${property._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  <FaEdit /> Update
                </Link>
                <button 
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperty;