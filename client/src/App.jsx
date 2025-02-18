import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyBids from "./pages/MyBids";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
