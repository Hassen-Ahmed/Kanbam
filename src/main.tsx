import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/style/main.scss";
import KanbamContextProvider from "./context/kanbamContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KanbamContextProvider>
      <App />
    </KanbamContextProvider>
  </React.StrictMode>
);
