import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Tabbar = () => {
  const [page, setPage] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const pageMap = {
      "my-bids": "My Bids",
      history: "History",
      profile: "Profile",
    };

    const pageName = location.pathname.split("/").filter(Boolean).pop();
    setPage(pageMap[pageName] || "Home");
  }, [location.pathname]);
  return (
    <>
      <main className="flex-1 max-h-[50px]  bg-white py-3 rounded-lg items-center justify-between px-6 mx-3 mt-3">
        <div>
          <p>{page}</p>
        </div>
      </main>
    </>
  );
};

export default Tabbar;
