import { useState } from "react";
import { Camera, Edit, Save, X } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthContext();
  const { profileData, isLoading, error, setProfileData } = useProfile(user);

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
      if (!response.ok || !json.success)
        throw new Error(json.message || "Failed to update profile");

      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading)
    return <div className="flex justify-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
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
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow hover:bg-white"
          >
            {isEditing ? (
              <X className="text-red-500" />
            ) : (
              <Edit className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Profile Content */}
        <div className="pt-20 p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {["img", "username", "address", "phone"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium  text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type={
                      field === "img"
                        ? "url"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={profileData?.[field] || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <span className="flex items-center justify-center gap-2">
                <Save className="mr-2" /> Save Changes 
                </span>
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
                {["role", "wallet", "phone", "address"].map((field) => (
                  <div key={field} className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 capitalize">
                      {field.replace("wallet", "Wallet Balance")}
                    </p>
                    <p className="font-semibold">
                      {field === "wallet"
                        ? `$${profileData?.wallet?.toFixed(2) || "0.00"}`
                        : profileData?.[field] || "Not provided"}
                    </p>
                  </div>
                ))}
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
