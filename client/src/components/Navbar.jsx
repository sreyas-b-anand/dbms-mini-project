/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { Gavel, History, Home, Tag, User, ArrowLeft } from "lucide-react";
import { useLogout } from "../hooks/useLogout";

const Navbar = ({ onNavbarOpen }) => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      <nav className="bg-sidebar text-sidebar-foreground flex min-h-screen max-h-screen items-start flex-col justify-between px-5 py-1 pb-3 gap-4 w-[200px]">
        <section className="flex flex-col items-start justify-start gap-5 w-full">
          {/* Logo & Title */}
          <header className="flex items-center justify-evenly py-3 min-w-full border-b border-sidebar-border w-full">
            <img
              className="w-[35px] h-[35px] rounded-full"
              src={Logo}
              alt="logo"
            />
            <p className="text-xl font-semibold">BidSnap</p>
            <ArrowLeft className="block md:hidden" onClick={onNavbarOpen} />
          </header>

          {/* Navigation Links */}
          <div className="flex flex-col items-start justify-around gap-4 w-full py-6 font-poppins">
            <Link className="flex items-center gap-2" to={"/dashboard"}>
              <Home size={18} /> Home
            </Link>
            <Link className="flex items-center gap-2" to={"/my-bids"}>
              <Gavel size={18} /> My Bids
            </Link>
            <Link className="flex items-center gap-2" to={"/sell-items"}>
              <Tag size={18} /> Sell Items
            </Link>
            <Link className="flex items-center gap-2" to={"/history"}>
              <History size={18} /> History
            </Link>
            <Link className="flex items-center gap-2" to={"/profile"}>
              <User size={18} /> Profile
            </Link>
          </div>
        </section>

        {/* Logout Button */}
        <div className="flex w-full items-start justify-start pt-3 border-t border-sidebar-border">
          <a
            onClick={handleSubmit}
            role="button"
            className="px-3 py-2 w-full text-center rounded-lg hover:opacity-80 hover:cursor-pointer bg-accent text-background"
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
