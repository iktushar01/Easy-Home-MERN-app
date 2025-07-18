import React from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaEnvelope,
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaIdBadge,
  FaUserCircle,
  FaEdit,
} from "react-icons/fa";

const AgentProfile = () => {
  const { user } = useAuth();

  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={user.photoURL || "/default-profile.png"}
                alt={user.displayName || "Agent Profile"}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <FaEdit className="text-primary" />
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mt-4">
            {user.displayName || "No Name"}
          </h2>
          <div className="badge badge-accent badge-lg mt-2">
            Professional Agent
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <FaUserCircle className="text-secondary" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaEnvelope className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Email</p>
                  <p className="font-medium break-all">{user.email || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaPhoneAlt className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Phone</p>
                  <p className="font-medium">{user.phoneNumber || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Address</p>
                  <p className="font-medium">{user.address || "Not Provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <FaUserTie className="text-secondary" />
              Professional Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaIdBadge className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Agent ID</p>
                  <p className="font-medium">{user.agentId || "Not Available"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaUserTie className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Company</p>
                  <p className="font-medium">{user.companyName || "Not Specified"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaGlobe className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Website</p>
                  <a
                    href={user.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-secondary transition-colors"
                  >
                    {user.website ? "Visit Website" : "Not Provided"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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

export default AgentProfile;