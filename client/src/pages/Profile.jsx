import { useState, useEffect } from "react";
import { Camera, Edit, Save, X } from "lucide-react";
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
  }, [user.email]);

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
    <div className="container mx-auto max-w-2xl p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          {/* Profile Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden">
                {profileData?.img ? (
                  <img
                    src={profileData.img}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Camera className="text-gray-500 w-12 h-12" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Toggle */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
            >
              {isEditing ? (
                <X className="text-red-500" />
              ) : (
                <Edit className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="img"
                  value={profileData?.img || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={profileData?.username || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profileData?.address || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData?.phone || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="mr-2" /> Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {profileData?.username}
                </h2>
                <p className="text-gray-600">{profileData?.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold">
                    {profileData?.role || "Not specified"}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Wallet Balance</p>
                  <p className="font-semibold">
                    ${profileData?.wallet?.toFixed(2) || "0.00"}
                  </p>
                </div>

                <div className=" bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">
                    {profileData?.address || "Not provided"}
                  </p>
                </div>

                <div className=" bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">
                    {profileData?.address || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                Joined:{" "}
                {profileData?.createdAt
                  ? new Date(profileData.createdAt).toLocaleDateString()
                  : "Unknown"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
