import React, { useState } from "react";
import { FaUser, FaLock, FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../Shared/Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosSecure = useAxiosSecure();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const password = watch("password");

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(
    "https://i.postimg.cc/JhcCVk8q/Pngtree-user-profile-avatar-13369988.png"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Form Submit
  const onSubmit = async (data) => {
    try {
      let photoURL =
        "https://i.postimg.cc/JhcCVk8q/Pngtree-user-profile-avatar-13369988.png";

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        photoURL = res.data.data.url;
      }

      // ✅ Firebase user create
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      // ✅ Firebase profile update
      await updateProfile(user, {
        displayName: data.fullName,
        photoURL,
      });

      // ✅ User database এ save
      await axiosSecure.post("/users", {
        displayName: data.fullName,
        email: data.email,
        photoURL,
        role: "user",
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created successfully",
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("❌ Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      {/* Left Side - Image */}
      <div
        className="w-full md:w-1/2 relative bg-cover bg-center flex items-center justify-center p-8"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="text-white flex justify-center items-center flex-col text-center relative z-10">
          <div className="flex gap-3">
            <Logo className="text-white" />
            <ThemeToggle />
          </div>
          <h2 className="text-5xl font-bold mt-6">Create Account</h2>
          <p className="my-2 text-blue-100">
            Join us to find your perfect property
          </p>
          <div className="flex gap-2">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full bg-base-200 max-w-md rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Register</h1>
          <p className="mb-8">Create your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ✅ Profile Picture Upload */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-24 h-24 mb-4">
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary-focus transition"
                >
                  <FaCamera className="text-white" />
                </label>
              </div>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <p className="text-sm text-gray-500">
                Upload profile picture (optional)
              </p>
            </div>

            {/* ✅ Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 " />
              </div>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* ✅ Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdEmail className="h-5 w-5 " />
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ✅ Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5" />
              </div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ✅ Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 " />
              </div>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* ✅ Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Register
              </button>
            </div>
          </form>

          <div className="divider">OR</div>
          <GoogleLogin from={from} />

          <div className="mt-6 text-center">
            <p className="text-sm ">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
