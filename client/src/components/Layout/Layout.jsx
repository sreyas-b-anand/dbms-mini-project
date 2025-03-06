import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Tabbar from "../Tabbar";

const Layout = () => {
  return (
    <main className="w-screen h-screen font-poppins flex bg-gray-200 overflow-auto">
      {/* Sidebar (Navbar) */}

      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 h-screen flex flex-col ">
        {/* Tabbar at the Top */}

        <Tabbar />

        {/* Page Content (Outlet) */}

        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
