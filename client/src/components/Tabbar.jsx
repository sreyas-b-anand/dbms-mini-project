import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User, Wallet } from "lucide-react";
const Tabbar = () => {
  const [page, setPage] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const pageMap = {
      "my-bids": "My Bids",
      history: "History",
      profile: "Profile",
    };

    const pageName = location.pathname?.split("/").filter(Boolean).pop();
    setPage(pageMap[pageName] || "Home");
  }, [location.pathname]);

  return (
    <div className="flex-1 max-h-[50px] bg-white py-3 rounded-lg flex items-center justify-between px-6 mx-3 mt-3">
      <div>
        <p>{page}</p>
      </div>
      <div className="flex items-center justify-center gap-9 flex-wrap ">
        <div className="flex items-center justify-center gap-2 flex-wrap px-2 py-1 bg-gray-200 rounded-lg">
          <Wallet size={20} strokeWidth={1.75} />
          <p className="text-center">{1000}</p>
        </div>
        <User size={20} strokeWidth={1.75} />
      </div>
    </div>
  );
};

export default Tabbar;
