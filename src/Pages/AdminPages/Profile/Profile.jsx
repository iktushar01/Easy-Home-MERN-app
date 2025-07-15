import React from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaEnvelope,
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaIdBadge,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center py-10">Loading profile...</p>;

  const {
    displayName,
    email,
    photoURL,
    phoneNumber,
    address,
    website,
    agentId,
    companyName,
    role, // assuming role is coming from user object
  } = user;

  return (
    <div className="max-w-md mx-auto bg-base-100 text-base-content shadow-lg rounded-lg p-6 mt-8">
      <div className="flex flex-col items-center">
        <img
          src={photoURL || "/default-profile.png"}
          alt={displayName || "User Profile"}
          className="w-28 h-28 rounded-full object-cover border-4 border-primary"
        />
        <h2 className="text-2xl font-bold mt-4">{displayName || "No Name"}</h2>

        {role && role.toLowerCase() !== "user" && (
          <p className="text-sm text-gray-500 mt-1 capitalize">Role: {role}</p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-primary w-5 h-5" />
          <span className="break-all">{email || "Not Provided"}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-primary w-5 h-5" />
          <span>{phoneNumber || "Phone not provided"}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-primary w-5 h-5" />
          <span>{address || "Address not provided"}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaGlobe className="text-primary w-5 h-5" />
          <a
            href={website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {website || "No Website"}
          </a>
        </div>


        <div className="flex items-center gap-3">
          <FaUserTie className="text-primary w-5 h-5" />
          <span>{companyName || "Company not specified"}</span>
        </div>
      </div>

      <button className="btn btn-primary btn-block mt-8">Edit Profile</button>
    </div>
  );
};

export default Profile;
