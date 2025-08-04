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
        const email = user.email.toLowerCase(); // Consistent email

        const userInfo = {
          name: user.displayName,
          email,
          role: "user",
          photoURL: user.photoURL || "https://i.postimg.cc/JhcCVk8q/Pngtree-user-profile-avatar-13369988.png",
        };

        // Check if user exists
        axiosSecure.get(`/users/${email}`)
          .then((res) => {
            if (res.data && res.status === 200) {
              console.log("✅ User already exists:", res.data);
              navigate(from || "/", { replace: true });
            } else {
              // New user: Save
              axiosSecure.post("/users", userInfo)
                .then((res) => {
                  console.log("✅ New user saved:", res.data);
                  navigate(from || "/", { replace: true });
                })
                .catch((err) => {
                  console.error("❌ Failed to save user:", err);
                });
            }
          })
          .catch((err) => {
            if (err.response?.status === 404) {
              // User not found – add user
              axiosSecure.post("/users", userInfo)
                .then((res) => {
                  console.log("✅ New user saved:", res.data);
                  navigate(from || "/", { replace: true });
                })
                .catch((err) => {
                  console.error("❌ Failed to save user:", err);
                });
            } else {
              console.error("❌ Error checking user existence:", err);
            }
          });
      })
      .catch((error) => {
        console.error("❌ Google sign-in failed:", error);
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
