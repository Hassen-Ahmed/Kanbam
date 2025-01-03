import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import KanbamContextProvider from "./context/kanbamContext.tsx";
import ListsContextProvider from "./context/ListsContext.tsx";
import RouterMain from "./router/RouterMain.tsx";
import "./assets/style/main.scss";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ListsContextProvider>
        <KanbamContextProvider>
          <RouterMain />
        </KanbamContextProvider>
      </ListsContextProvider>
    </Provider>
  </StrictMode>
);
