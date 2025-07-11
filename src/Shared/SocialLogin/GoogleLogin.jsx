import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GoogleLogin = ({ from }) => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "user",
        };

        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            console.log("User saved in DB:", res.data);
            navigate(from || "/", { replace: true });
          })
          .catch((err) => {
            console.error("Failed to save user in DB", err);
          });
      })
      .catch((error) => {
        console.error("Google sign-in failed:", error);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-white text-black border border-[#e5e5e5] flex items-center gap-2"
      >
        <FcGoogle size={20} />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
