import { Link, useNavigate } from "react-router-dom";
//import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../assets/logo.jpg";
import { Gavel, History, Home, Tag, User } from "lucide-react";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  //const {user} = useAuthContext()
  const {logout} = useLogout()
  const navigate = useNavigate()
  const handleSubmit = async()=>{
    await logout()
    navigate('/auth')
  }
   return (
    <>
      <nav className="bg-sidebar text-sidebar-foreground flex  h-screen items-start flex-col justify-between px-5 py-1 pb-3 gap-4 w-[200px]">
        <section className="flex flex-col items-start justify-start gap-5 w-full">
          <header className="flex items-center justify-evenly py-3 min-w-full border-b-1 w-full border-sidebar-border">
            <img
              className="w-[35px] h-[35px] rounded-full "
              src={Logo}
              alt="logo"
            />
            <p className="text-xl text-sidebar-foreground pb-1 font-semibold">
              BidSnap
            </p>
          </header>
          <div className="flex flex-col items-start justify-around gap-4 w-full py-6 font-poppins">
            <Link className="flex items-center justify-center gap-2 " to={"/"}>
              <Home size={18} /> Home
            </Link>
            <Link
              className="flex items-center justify-center gap-2 "
              to={"/my-bids"}
            >
              <Gavel size={18} /> My Bids
            </Link>
            <Link
              className="flex items-center justify-center gap-2 "
              to={"sell-items"}
            >
              <Tag size={18} /> Sell Items
            </Link>
            <Link
              className="flex items-center justify-center gap-2 "
              to={"/history"}
            >
              {" "}
              <History size={18} /> History
            </Link>
            <Link
              className="flex items-center justify-center gap-2 "
              to={"/profile"}
            >
              <User size={18} /> Profile
            </Link>
          </div>
        </section>
        <div className="flex w-full items-start justify-start pt-3 border-t">
          {/*<p>{user?.email}</p>*/}
          <a
            onClick={handleSubmit}
            role="button"
            className="px-3 py-2 border-1 w-full text-center rounded-lg  opacity-100 hover:opacity-80 hover:cursor-pointer bg-accent-foreground text-primary"
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
