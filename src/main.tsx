import React from "react";
import ReactDOM from "react-dom/client";
import KanbamContextProvider from "./context/kanbamContext.tsx";
import ListsContextProvider from "./context/ListsContext.tsx";
import RouterMain from "./router/RouterMain.tsx";
import "./assets/style/main.scss";
import TokenContextProvider from "./context/TokenContext.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <TokenContextProvider>
      <ListsContextProvider>
        <KanbamContextProvider>
          <RouterMain />
        </KanbamContextProvider>
      </ListsContextProvider>
    </TokenContextProvider>
  </React.StrictMode>
);
