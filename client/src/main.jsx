import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { ItemProvider } from "./hooks/useItems";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </AuthContextProvider>
  </StrictMode>
);
