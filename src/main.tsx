import React from "react";
import ReactDOM from "react-dom/client";
import KanbamContextProvider from "./context/kanbamContext.tsx";
import ListsContextProvider from "./context/ListsContext.tsx";
import RouterMain from "./router/RouterMain.tsx";
import "./assets/style/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ListsContextProvider>
      <KanbamContextProvider>
        <RouterMain />
      </KanbamContextProvider>
    </ListsContextProvider>
  </React.StrictMode>
);
