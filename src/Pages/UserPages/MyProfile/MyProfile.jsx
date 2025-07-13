import React from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaEnvelope,
  FaUser,
  FaPhoneAlt,
  FaRegCheckCircle,
  FaTimesCircle,
  FaRegClock,
  FaFingerprint,
  FaUserShield,
  FaImage,
  FaGoogle,
} from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-base-100 text-base-content shadow-xl rounded-lg p-6 mt-8">
      <div className="flex flex-col items-center">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt={user.displayName || "User"}
          className="w-28 h-28 rounded-full object-cover border-4 border-primary"
        />
        <h2 className="text-2xl font-bold mt-4">{user.displayName || "No Name"}</h2>
        <p className="text-sm text-gray-500 mt-1">
          <FaUserShield className="inline mr-1" />
          Role: User
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-primary" />
          <span className="break-all">{user.email || "No email"}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-primary" />
          <span>{user.phoneNumber || "No phone number"}</span>
        </div>

        <div className="flex items-center gap-3">
          {user.emailVerified ? (
            <>
              <FaRegCheckCircle className="text-success" />
              <span>Email Verified</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-error" />
              <span>Email Not Verified</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <FaFingerprint className="text-primary" />
          <span>User UID: <span className="break-all">{user.uid}</span></span>
        </div>

        <div className="flex items-center gap-3">
          <FaRegClock className="text-primary" />
          <span>
            Joined: {user.metadata?.creationTime || "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaRegClock className="text-primary" />
          <span>
            Last Sign-in: {user.metadata?.lastSignInTime || "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaUser className="text-primary" />
          <span>{user.isAnonymous ? "Anonymous User" : "Signed In"}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaImage className="text-primary" />
          <span>Photo URL: {user.photoURL ? "Available" : "Not Set"}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaGoogle className="text-primary" />
          <span>Provider: {user.providerData?.[0]?.providerId || "N/A"}</span>
        </div>
      </div>

      <button className="btn btn-primary btn-block mt-8">Edit Profile</button>
    </div>
  );
};

export default MyProfile;
