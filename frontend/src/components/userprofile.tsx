import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const UserProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User Data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "A passionate developer.",
    image: "", // base64 or image URL
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });
  const [emailError, setEmailError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = () => {
    if (!validateEmail(tempData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setUserData(tempData);
    setEditMode(false);
    setEmailError("");
    alert("Profile updated successfully!");
  };

  return (
    <>
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="fixed top-16 left-0 right-0 bottom-0 bg-gray-100 p-6 overflow-auto transition-all duration-300"
        style={{ paddingLeft: sidebarOpen ? 256 : 24 }}
      >
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
          {/* Left: Image Upload */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 shadow-md">
              <img
                src={tempData.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-4 border-2 border-[#2e2e2e] hover:bg-[#9e9e9e87] rounded-md w-[80%] p-2 cursor-pointer transition-all duration-200 ease-in-out"
              />
            )}
          </div>

          {/* Right: Editable Info */}
          <div className="flex-1 border-2 border-[#2e2e2e] rounded-4xl p-10">
            <h2 className="text-3xl font-bold text-[#2e2e2e] mb-6">User Profile</h2>

            <div className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#4e4e4e] mb-1">
                  Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) =>
                      setTempData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border-2 border-[#6e6e6e] px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                  />
                ) : (
                  <p className="text-lg text-gray-800">{userData.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#4e4e4e] mb-1">
                  Email
                </label>
                {editMode ? (
                  <>
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => {
                        setTempData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                        setEmailError("");
                      }}
                      className="w-full border-2 border-[#4e4e4e] px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                    />
                    {emailError && (
                      <p className="text-red-600 text-sm mt-1">{emailError}</p>
                    )}
                  </>
                ) : (
                  <p className="text-lg text-gray-800">{userData.email}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-[#4e4e4e] mb-1">
                  Bio
                </label>
                {editMode ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) =>
                      setTempData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="w-full border-2 border-[#4e4e4e] px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-800">{userData.bio}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-[#33cc33ba] border-2 border-[#2e2e2e] text-[#2e2e2e] font-semibold rounded-lg hover:bg-[#33CC34]"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setTempData(userData);
                      setEmailError("");
                    }}
                    className="px-5 py-2 border-2 border-[#2e2e2e] text-gray-700 font-semibold rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
