import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../Componens/Buttons/LoadingSpinner';

const MyProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [propertyToUpdate, setPropertyToUpdate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    image: ''
  });

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

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/properties/${propertyToDelete._id}`);
      toast.success('Property deleted successfully');
      setProperties(prev => prev.filter(p => p._id !== propertyToDelete._id));
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error('Failed to delete property');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/properties/${propertyToUpdate._id}`, formData);
      toast.success('Property updated successfully');
      setProperties(prev => prev.map(p => 
        p._id === propertyToUpdate._id ? { ...p, ...formData } : p
      ));
      setUpdateModalOpen(false);
    } catch (err) {
      toast.error('Failed to update property');
    }
  };

  if (loading) return <LoadingSpinner/>;
  if (error) return <div className="text-center py-8 text-error">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delete Confirmation Modal */}
      <dialog open={deleteModalOpen} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete "{propertyToDelete?.title}"?</p>
          <div className="modal-action">
            <button onClick={() => setDeleteModalOpen(false)} className="btn">
              Cancel
            </button>
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </dialog>

      {/* Update Property Modal */}
      <dialog open={updateModalOpen} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Property</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Min Price</span>
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={(e) => setFormData({...formData, minPrice: e.target.value})}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Max Price</span>
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={(e) => setFormData({...formData, maxPrice: e.target.value})}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="modal-action">
              <button type="button" onClick={() => setUpdateModalOpen(false)} className="btn">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link to="/dashboard/agent/add-property" className="btn btn-primary">
          Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">No Properties Found</h2>
          <p className="mt-2">You haven't added any properties yet.</p>
          <Link to="/dashboard/agent/add-property" className="btn btn-primary mt-4">
            Add New Property
          </Link>
        </div>
      ) : (
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
                <p><span className="font-semibold">Price Range:</span> ${property.minPrice} - ${property.maxPrice}</p>
                
                <div className="flex items-center mt-2">
                  <div className="avatar mr-2">
                    <div className="w-8 rounded-full">
                      <img src={property.agentImage || "/default-avatar.png"} alt="Agent" />
                    </div>
                  </div>
                  <span>{property.agentName}</span>
                </div>

                <div className="mt-2">
                  <span className={`badge ${
                    property.status === 'verified' ? 'badge-success' : 
                    property.status === 'rejected' ? 'badge-error' : 'badge-warning'
                  }`}>
                    {property.status === 'verified' ? <FaCheck className="mr-1" /> : 
                     property.status === 'rejected' ? <FaTimes className="mr-1" /> : null}
                    {property.status || 'pending'}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button 
                    onClick={() => {
                      setPropertyToUpdate(property);
                      setFormData({
                        title: property.title,
                        location: property.location,
                        minPrice: property.minPrice,
                        maxPrice: property.maxPrice,
                        image: property.image
                      });
                      setUpdateModalOpen(true);
                    }}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    <FaEdit /> Update
                  </button>
                  <button 
                    onClick={() => {
                      setPropertyToDelete(property);
                      setDeleteModalOpen(true);
                    }}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperty;