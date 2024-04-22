import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/style/main.scss";
import KanbamContextProvider from "./context/kanbamContext.tsx";
import ListsContextProvider from "./context/ListsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ListsContextProvider>
      <KanbamContextProvider>
        <App />
      </KanbamContextProvider>
    </ListsContextProvider>
  </React.StrictMode>
);
