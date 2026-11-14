
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AppProvider } from "./context/AppContext";

import "./styles/index.css";

const redirectPath = new URLSearchParams(window.location.search).get("p");
if (redirectPath?.startsWith("/") && !redirectPath.startsWith("//")) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.history.replaceState(null, "", `${basePath}${redirectPath}`);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
