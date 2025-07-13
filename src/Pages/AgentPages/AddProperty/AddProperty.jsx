import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const AddProperty = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const propertyData = {
      title: data.title,
      location: data.location,
      priceRange: data.priceRange,
      agentName: user?.displayName || '',
      agentEmail: user?.email || '',
      image: data.image[0], // File object
    };

    console.log(propertyData); // Replace with Firebase logic
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Property</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            placeholder="Enter property title"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required.</p>}
        </div>

        {/* Property Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            {...register('location', { required: true })}
            type="text"
            placeholder="Enter location"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">Location is required.</p>}
        </div>

        {/* Property Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Image</label>
          <input
            {...register('image', { required: true })}
            type="file"
            accept="image/*"
            className="w-full"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">Image is required.</p>}
        </div>

        {/* Agent Name (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
          <input
            {...register('agentName')}
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-500"
          />
        </div>

        {/* Agent Email (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent Email</label>
          <input
            {...register('agentEmail')}
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-500"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <input
            {...register('priceRange', { required: true })}
            type="text"
            placeholder="e.g. $1000 - $2000"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.priceRange && (
            <p className="text-red-500 text-sm mt-1">Price range is required.</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
