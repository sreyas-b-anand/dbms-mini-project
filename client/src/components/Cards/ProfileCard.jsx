/* eslint-disable react/prop-types */
import Loader from "../utils/Loader";
import { useAuthContext } from "../../hooks/useAuthContext";
import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";
import WalletCard from "./WalletCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, UserCircle } from "lucide-react";

const ProfileCard = ({ onProfileOpen, onWalletOpen }) => {
  const { user } = useAuthContext();
  const { profileData, isLoading } = useProfile(user);

  return (
    <Card className="w-full max-w-sm bg-background text-foreground rounded-xl shadow-lg px-9">
      <CardHeader className="flex items-center justify-center flex-col">
        {isLoading ? (
          <Loader />
        ) : profileData ? (
          <>
            <UserCircle size={50} className="text-primary mb-2" />
            <CardTitle className="text-lg font-semibold">
              {profileData?.username || "No Username"}
            </CardTitle>
            <p className="text-foreground/70 text-sm">
              {profileData?.email || "No Email"}
            </p>
          </>
        ) : (
          <p className="text-muted">No profile data available</p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {profileData && (
          <>
            <Link
              onClick={onProfileOpen}
              to="/profile"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
            >
              <User size={20} />
              <span>Go to My Profile</span>
            </Link>
            <WalletCard onWalletOpen={onWalletOpen} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
