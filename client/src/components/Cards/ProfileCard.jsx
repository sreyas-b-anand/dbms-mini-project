/* eslint-disable react/prop-types */
import Loader from "../utils/Loader";
import { useAuthContext } from "../../hooks/useAuthContext";
import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, UserCircle } from "lucide-react";

const ProfileCard = ({onProfileOpen}) => {
  const { user } = useAuthContext();
  const { profileData, isLoading } = useProfile(user);

  return (
    <Card className="w-full max-w-sm bg-gray-900 text-white rounded-xl shadow-lg px-9">
      <CardHeader className="flex items-center justify-center flex-col">
        {isLoading ? (
          <Loader />
        ) : profileData ? (
          <>
            <UserCircle size={50} className="text-gray-400 mb-2" />
            <CardTitle className="text-lg font-semibold">
              {profileData?.username || "No Username"}
            </CardTitle>
            <p className="text-gray-400 text-sm">
              {profileData?.email || "No Email"}
            </p>
          </>
        ) : (
          <p className="text-gray-500">No profile data available</p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {profileData && (
          <>
            <Link
            onClick={onProfileOpen}
              to="/profile"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
            >
              <User size={20} />
              <span>Go to My Profile</span>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
