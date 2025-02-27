import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const [error, setError] = useState();
  const { user } = useAuthContext();
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        setError(json.message || "An unexpected error occured");
        return;
      }

      console.log(json);
      setProfileData(json.profile);
    };
    fetchData();
  }, []);
  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 p-3 flex-wrap">
        <div className="bg-background ">
          <div>
            <h2>Profile</h2>
          </div>
          <section>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <p>{profileData.username}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;
