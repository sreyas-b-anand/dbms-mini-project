import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import MyBids from "./pages/MyBids";
import History from "./pages/Transactions";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./NotFound";
import SellItems from "./pages/SellItems";
import { Toaster } from "sonner";
import ItemDetails from "./pages/itemDetails";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/my-bids" element={<MyBids />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell-items" element={<SellItems />} />
            <Route path="/item/:id" element={<ItemDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
