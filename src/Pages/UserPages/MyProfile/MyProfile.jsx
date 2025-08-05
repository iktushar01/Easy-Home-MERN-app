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
  FaEdit,
  FaCalendarAlt,
  FaHistory,
  FaUserSecret
} from "react-icons/fa";

const MyProfile = () => {
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
                  src={user.photoURL || "/default-profile.png"}
                  alt={user.displayName || "User Profile"}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mt-4">
            {user.displayName || "No Name"}
          </h1>
          
          <div className="badge badge-accent badge-lg mt-2 gap-1">
            <FaUserShield />
            {user.isAnonymous ? "Anonymous User" : "Registered User"}
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
              <FaUser className="text-secondary" />
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaEnvelope className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Email Address</p>
                  <p className="font-medium break-all">{user.email || "Not Provided"}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {user.emailVerified ? (
                      <span className="badge badge-success badge-sm gap-1">
                        <FaRegCheckCircle />
                        Verified
                      </span>
                    ) : (
                      <span className="badge badge-error badge-sm gap-1">
                        <FaTimesCircle />
                        Not Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaPhoneAlt className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Phone Number</p>
                  <p className="font-medium">{user.phoneNumber || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaFingerprint className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">User ID</p>
                  <p className="font-medium text-xs break-all">{user.uid}</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
              <FaUserShield className="text-secondary" />
              System Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaCalendarAlt className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Account Created</p>
                  <p className="font-medium">
                    {user.metadata?.creationTime || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaHistory className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Last Sign-in</p>
                  <p className="font-medium">
                    {user.metadata?.lastSignInTime || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaImage className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Profile Photo</p>
                  <p className="font-medium">
                    {user.photoURL ? "Available" : "Not Set"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaGoogle className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Auth Provider</p>
                  <p className="font-medium capitalize">
                    {user.providerData?.[0]?.providerId.replace(".com", "") || "N/A"}
                  </p>
                </div>
              </div>
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

export default MyProfile;