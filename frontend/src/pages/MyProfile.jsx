import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { assets } from "../assets/assets";

const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birthday: "",
  });

  // Initialize profile data from user context
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender || "",
        birthday: user.dateOfBirth || "",
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // For now, just update local state
      // TODO: Implement API call to update user profile
      console.log('Saving profile data:', profileData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle image upload logic here
      console.log("Image uploaded:", file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={assets.profile_pic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Upload Box */}
            <div className="relative">
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="imageUpload"
                className="w-32 h-32 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer flex flex-col items-center justify-center group"
              >
                <svg
                  className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-xs text-indigo-600 text-center leading-tight">
                  Upload Image
                </span>
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="mt-6">
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-indigo-300 focus:border-indigo-500 outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">
                {profileData.name}
              </h1>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
            CONTACT INFORMATION
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-20 text-sm font-medium text-gray-600">
                Email id:
              </span>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="ml-4 text-indigo-600 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none flex-1"
                />
              ) : (
                <span className="ml-4 text-indigo-600">
                  {profileData.email}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <span className="w-20 text-sm font-medium text-gray-600">
                Phone:
              </span>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="ml-4 text-indigo-600 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none flex-1"
                />
              ) : (
                <span className="ml-4 text-indigo-600">
                  {profileData.phone}
                </span>
              )}
            </div>

            <div className="flex items-start">
              <span className="w-20 text-sm font-medium text-gray-600 mt-1">
                Address:
              </span>
              {isEditing ? (
                <textarea
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="ml-4 text-gray-800 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none flex-1 resize-none"
                  rows="2"
                />
              ) : (
                <span className="ml-4 text-gray-800 leading-relaxed">
                  {profileData.address}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
            BASIC INFORMATION
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-20 text-sm font-medium text-gray-600">
                Gender:
              </span>
              {isEditing ? (
                <select
                  value={profileData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="ml-4 text-gray-800 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className="ml-4 text-gray-800">{profileData.gender}</span>
              )}
            </div>

            <div className="flex items-center">
              <span className="w-20 text-sm font-medium text-gray-600">
                Birthday:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.birthday}
                  onChange={(e) =>
                    handleInputChange("birthday", e.target.value)
                  }
                  className="ml-4 text-gray-800 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none flex-1"
                />
              ) : (
                <span className="ml-4 text-gray-800">
                  {profileData.birthday}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between">
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`px-8 py-3 rounded-full font-medium transition-colors shadow-lg ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {loading ? 'Saving...' : 'Save information'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-600 rounded-full font-medium hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-8 py-3 border-2 border-gray-300 text-gray-600 rounded-full font-medium hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
