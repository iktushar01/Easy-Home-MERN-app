import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../Shared/Logo/Logo";
import { Link } from "react-router";
import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data =>{
    console.log(data);
  }
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="text-white  flex justify-center items-center flex-col text-center relative z-10">
          <div className="flex gap-3">
            <div>
              <Logo className="text-white" />
            </div>
            <ThemeToggle />
          </div>
          <h2 className="text-5xl font-bold mt-6">Create Account</h2>
          <p className="my-2 text-blue-100">
            Join us to find your perfect property
          </p>
          <div className=" flex gap-2">
            <Link to="/login">
              {" "}
              <button className="btn btn-primary">login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full bg-base-200 max-w-md  rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold  mb-2">Register</h1>
          <p className=" mb-8">Create your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 " />
                </div>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 " />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 " />
                </div>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>

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

          <div className="mt-6 text-center">
            <p className="text-sm ">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
