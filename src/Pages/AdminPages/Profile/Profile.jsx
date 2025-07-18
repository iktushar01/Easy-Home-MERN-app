import React from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaEnvelope,
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaIdBadge,
  FaUser,
  FaEdit
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  const {
    displayName,
    email,
    photoURL,
    phoneNumber,
    address,
    website,
    companyName,
    role,
  } = user;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center relative">
          <div className="absolute top-4 right-4">
            <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20">
              <FaEdit />
            </button>
          </div>
          
          <div className="flex justify-center">
            <div className="avatar relative">
              <div className="w-32 h-32 rounded-full ring ring-white ring-offset-2 ring-offset-base-100 shadow-lg">
                <img
                  src={photoURL || "/default-profile.png"}
                  alt={displayName || "User Profile"}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mt-4">
            {displayName || "No Name"}
          </h1>
          
          {role && role.toLowerCase() !== "user" && (
            <div className="badge badge-accent badge-lg mt-2 capitalize">
              {role}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
              <FaUser className="text-secondary" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaEnvelope className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Email Address</p>
                  <p className="font-medium break-all">{email || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaPhoneAlt className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Phone Number</p>
                  <p className="font-medium">{phoneNumber || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Address</p>
                  <p className="font-medium">{address || "Not Provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
              <FaUserTie className="text-secondary" />
              Professional Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaGlobe className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Website</p>
                  <a
                    href={website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-secondary transition-colors"
                  >
                    {website ? (website.length > 20 ? website.substring(0, 20) + "..." : website) : "Not Provided"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaUserTie className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Company</p>
                  <p className="font-medium">{companyName || "Not Specified"}</p>
                </div>
              </div>

              {role && role.toLowerCase() !== "user" && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaIdBadge className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Role</p>
                    <p className="font-medium capitalize">{role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <button className="btn btn-primary btn-block gap-2">
            <FaEdit />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;