import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (parseFloat(data.minPrice) >= parseFloat(data.maxPrice)) {
      return alert("Minimum price should be less than maximum price.");
    }

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      const imageUrl = res.data.data.url;

      const propertyData = {
        title: data.title,
        description: data.description,
        location: data.location,
        minPrice: parseFloat(data.minPrice),
        maxPrice: parseFloat(data.maxPrice),
        image: imageUrl,
        agentImage: user?.photoURL || "",
        agentName: user?.displayName || "",
        agentEmail: user?.email || "",
      };

      const saveRes = await axiosSecure.post("/properties", propertyData);

      if (saveRes.data.result?.insertedId) {
        alert("Property added successfully!");
        reset();
      } else {
        alert("Failed to save property.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Add Property
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Property Title</span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter property title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-sm text-error mt-1">Title is required.</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            placeholder="Enter property description"
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <p className="text-sm text-error mt-1">Description is required.</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...register("location", { required: true })}
            type="text"
            placeholder="Enter location"
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-sm text-error mt-1">Location is required.</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">
            <span className="label-text">Property Image</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-sm text-error mt-1">Image is required.</p>
          )}
        </div>

        {/* Agent Name */}
        <div>
          <label className="label">
            <span className="label-text">Agent Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-disabled w-full"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label className="label">
            <span className="label-text">Agent Email</span>
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-disabled w-full"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="label">
            <span className="label-text">Minimum Price</span>
          </label>
          <input
            {...register("minPrice", { required: true })}
            type="number"
            placeholder="Enter minimum price"
            className="input input-bordered w-full"
          />
          {errors.minPrice && (
            <p className="text-sm text-error mt-1">
              Minimum price is required.
            </p>
          )}
        </div>

        {/* Max Price */}
        <div>
          <label className="label">
            <span className="label-text">Maximum Price</span>
          </label>
          <input
            {...register("maxPrice", { required: true })}
            type="number"
            placeholder="Enter maximum price"
            className="input input-bordered w-full"
          />
          {errors.maxPrice && (
            <p className="text-sm text-error mt-1">
              Maximum price is required.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
