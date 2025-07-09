import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
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
