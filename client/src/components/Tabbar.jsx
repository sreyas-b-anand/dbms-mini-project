/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, User, Wallet } from "lucide-react";
import { Input } from "./ui/input";
import { useAuthContext } from "../hooks/useAuthContext";
import useWallet from "../hooks/useWallet";
import Loader from "./utils/Loader";
import { toast } from "sonner";

const Topbar = ({
  onWalletOpen,
  onProfileOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const [page, setPage] = useState("Home");
  const location = useLocation();
  const { user } = useAuthContext();

  const { wallet, isLoading, error } = useWallet(user);
  if (error) {
    toast.error(error);
  }
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
    <div className="bg-background border border-border m-3 mb-0 rounded-lg px-3">
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center justify-center gap-20 px-3">
          <h1 className="text-lg font-medium text-foreground">{page}</h1>
          <div className="flex items-center justify-center gap-3">
            <Input
              type="search"
              className="max-w-[280px] pr-20"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-muted rounded-full py-1.5 pl-3 pr-1.5 border border-border">
            <Wallet size={16} className="text-foreground mr-2" />
            <span className="text-sm font-medium text-foreground mr-2">
              ${wallet}
            </span>
            <button
              onClick={onWalletOpen}
              className="bg-accent hover:cursor-pointer text-background p-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              {!isLoading ? <Plus size={12} /> : <Loader />}
            </button>
          </div>

          <button
            onClick={onProfileOpen}
            className="relative flex items-center justify-center w-9 h-9 bg-accent rounded-full hover:bg-accent/80 transition-colors hover:cursor-pointer"
          >
            <User size={18} className="text-background" />
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-failure border-2 border-background rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
