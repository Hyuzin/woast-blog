import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
