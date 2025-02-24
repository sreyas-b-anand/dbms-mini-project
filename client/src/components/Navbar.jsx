import { Link } from "react-router-dom";
//import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../assets/logo.jpg";
const Navbar = () => {
  //const {user} = useAuthContext()
  return (
    <>
      <nav className="bg-blue-950 text-primary flex h-screen items-start flex-col justify-between px-5 py-1 pb-3 gap-4 w-[200px]">
        <section className="flex flex-col items-start justify-start gap-5 w-full">
          <header className="flex items-center justify-evenly py-3 min-w-full border-b-1 w-full border-secondary">
            <img
              className="w-[35px] h-[35px] rounded-full "
              src={Logo}
              alt="logo"
            />
            <p className="text-xl text-primary pb-1 font-semibold">BidSnap</p>
          </header>
          <div className="flex flex-col items-start justify-around gap-4 w-full py-6 font-poppins">
            <Link to={"/"}>Home</Link>
            <Link to={"/my-bids"}>My Bids</Link>
            <Link to={"/history"}>History</Link>
            <Link to={"/profile"}>Profile</Link>
          </div>
        </section>
        <div className="flex w-full items-start justify-start text-error">
          {/*<p>{user?.email}</p>*/}
          <a
            role="button"
            className="px-3 py-2 border-1 rounded-lg border-danger opacity-80 hover:opacity-100 hover:cursor-pointer text-danger"
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
