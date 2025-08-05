import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
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
      Swal.fire({
        icon: "error",
        title: "Invalid Price Range",
        text: "Minimum price should be less than maximum price.",
        confirmButtonColor: "#3b82f6",
      });
      return;
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
        agentImage: user?.photoURL || "https://i.postimg.cc/JhcCVk8q/Pngtree-user-profile-avatar-13369988.png",
        agentName: user?.displayName || "",
        agentEmail: user?.email || "",
      };

      const saveRes = await axiosSecure.post("/properties", propertyData);

      if (saveRes.data.result?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Property added successfully!",
          confirmButtonColor: "#3b82f6",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save property.",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      console.error("Error adding property:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-base-100 shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-medium">Property Title</span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter property title"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.title && (
            <p className="text-sm text-error mt-2">Title is required.</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-medium">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            placeholder="Enter property description"
            className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.description && (
            <p className="text-sm text-error mt-2">Description is required.</p>
          )}
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-medium">Location</span>
          </label>
          <input
            {...register("location", { required: true })}
            type="text"
            placeholder="Enter location"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.location && (
            <p className="text-sm text-error mt-2">Location is required.</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-medium">Property Image</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.image && (
            <p className="text-sm text-error mt-2">Image is required.</p>
          )}
        </div>

        {/* Agent Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agent Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Agent Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-disabled w-full bg-base-200"
            />
          </div>

          {/* Agent Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Agent Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-disabled w-full bg-base-200"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Min Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Minimum Price</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                {...register("minPrice", { required: true })}
                type="number"
                placeholder="Enter minimum price"
                className="input input-bordered w-full pl-8 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            {errors.minPrice && (
              <p className="text-sm text-error mt-2">Minimum price is required.</p>
            )}
          </div>

          {/* Max Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Maximum Price</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                {...register("maxPrice", { required: true })}
                type="number"
                placeholder="Enter maximum price"
                className="input input-bordered w-full pl-8 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            {errors.maxPrice && (
              <p className="text-sm text-error mt-2">Maximum price is required.</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="btn btn-primary w-full text-lg font-semibold hover:bg-primary-focus transition-all"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;