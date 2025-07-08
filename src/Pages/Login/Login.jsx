import React from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../Shared/Logo/Logo";
import { Link } from "react-router";
import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle";
import { useForm } from "react-hook-form";

const Login = () => {
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

        <div className="text-white flex justify-center items-center flex-col text-center relative z-10">
          <div className="flex gap-3">
            <div>
            <Logo className="text-white" />
          </div>
           <ThemeToggle />
          </div>
          <h2 className="text-5xl font-bold mt-6">Welcome Back</h2>
          <p className="my-2 text-blue-100">
            Find your perfect property with us
          </p>
          <div className=" flex gap-2">
           <Link to='/login'> <button className="btn btn-primary">login</button></Link>
            <Link to='/register'><button className="btn btn-primary">Register</button></Link>
           
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full bg-base-200 max-w-md rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold  mb-2">Login</h1>
          <p className=" mb-8">Please enter your credentials</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
                  <FaLock className="h-5 w-5 " />
                </div>
                <input
                  type="password"
                   {...register('password')}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm "
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Sign in
              </button>
            </div>
          </form>

            <div className="divider">OR</div>


          <div className="mt-6 text-center">
            <p className="text-sm ">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
