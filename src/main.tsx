import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
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
        <RouterMain />
      </ListsContextProvider>
    </Provider>
  </StrictMode>
);
