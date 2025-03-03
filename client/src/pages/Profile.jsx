import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const json = await response.json();
        console.log(json);
        if (!response.ok || !json.success) {
          setError(json.message || "Failed to load profile");
          return;
        }

        setProfileData(json.profile);
      } catch (err) {
        console.log(err);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/profile/update-profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, profile: profileData }),
        }
      );
      const json = await response.json();

      if (!response.ok || !json.success) {
        setError(json.message || "Failed to update profile");
        return;
      }

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setError("Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading)
    return <div className="flex justify-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          {profileData?.username || "User"}
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            {profileData?.img ? (
              <img
                src={profileData.img}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border shadow"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                <Camera className="text-gray-500 text-4xl" />
              </div>
            )}
          </div>

          {/* Image Input in Edit Mode */}
          {isEditing && (
            <input
              type="url"
              name="img"
              placeholder="Enter image URL"
              value={profileData?.img || ""}
              onChange={handleInputChange}
              className="mt-3 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Profile Information */}
        <div className="col-span-2 space-y-4">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profileData?.username || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData?.address || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData?.phone || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Email */}
              <div className="border p-3 rounded-md">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-800">
                  {profileData?.email || "Not Available"}
                </p>
              </div>

              {/* Role */}
              <div className="border p-3 rounded-md">
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-gray-800">
                  {profileData?.role || "Not specified"}
                </p>
              </div>

              {/* Address */}
              <div className="border p-3 rounded-md">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-800">
                  {profileData?.address || "Not provided"}
                </p>
              </div>

              {/* Phone */}
              <div className="border p-3 rounded-md">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-gray-800">
                  {profileData?.phone || "Not provided"}
                </p>
              </div>

              {/* Wallet Balance */}
              <div className="border p-3 rounded-md">
                <p className="text-sm font-medium text-gray-500">
                  Wallet Balance
                </p>
                <p className="text-gray-800">
                  ${profileData?.wallet?.toFixed(2) || "0.00"}
                </p>
              </div>

              {/* Joined Date */}
              <div className="border p-3 rounded-md">
                <p className="text-sm font-medium text-gray-500">Joined</p>
                <p className="text-gray-800">
                  {profileData?.createdAt
                    ? new Date(profileData.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
