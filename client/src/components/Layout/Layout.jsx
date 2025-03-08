import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Tabbar from "../Tabbar";
import WalletForm from "../Forms/WalletForm";
import { useState } from "react";

const Layout = () => {
  const [isWallet, setIsWallet] = useState(false);
  const onWalletOpen = async () => {
    setIsWallet(!isWallet);
  };
  return (
    <main className="w-screen h-screen font-poppins flex bg-gray-200 overflow-auto">
      {isWallet && (
        /* z-index 20 */
        <div className="absolute z-20 w-full h-full flex items-center justify-center">
          <WalletForm onWalletOpen={onWalletOpen}/>
        </div>
      )}
      {/* Sidebar (Navbar) */}
      <Navbar />

      {/* Main Content Area */}
      <div className={`flex-1 min-w-0 h-screen flex flex-col  ${isWallet ? "opacity-30 " : "opacity-100"}`}>
        <Tabbar onWalletOpen={onWalletOpen} />

        {/* Page Content (Outlet) */}

        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
