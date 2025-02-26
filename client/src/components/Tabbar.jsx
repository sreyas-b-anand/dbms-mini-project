import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, User, Wallet, ChevronDown } from "lucide-react";

const Topbar = () => {
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
    <div className="bg-card border border-border m-3 mb-0 rounded-lg">
      <div className="px-3">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-card-foreground">{page}</h1>
            <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-secondary rounded-full py-1.5 pl-3 pr-1.5 border border-border">
              <Wallet size={16} className="text-secondary-foreground mr-2" />
              <span className="text-sm font-medium text-secondary-foreground mr-2">
                $1,000
              </span>
              <button className="bg-sidebar-primary text-sidebar-primary-foreground p-1.5 rounded-full hover:opacity-90 transition-opacity">
                <Plus size={12} />
              </button>
            </div>

            <button className="relative flex items-center justify-center w-9 h-9 bg-accent rounded-full hover:bg-accent/80 transition-colors">
              <User size={18} className="text-accent-foreground" />
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-chart-1 border-2 border-card rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
