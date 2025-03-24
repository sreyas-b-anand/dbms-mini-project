import { useEffect, useState, useMemo } from "react";

const useProfile = (user) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("profile", user);
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
  }, [user]);

  // Memoize the profile data to avoid unnecessary recalculations
  const memoizedProfileData = useMemo(() => profileData, [profileData]);

  return { profileData: memoizedProfileData, isLoading, error, setProfileData };
};

export default useProfile;
