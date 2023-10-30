import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DarkModeContext from "./context/darkModeContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContext>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContext>
  </React.StrictMode>
);
