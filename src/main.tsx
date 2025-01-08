import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import RouterMain from "./router/RouterMain.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import "./assets/style/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterMain />
    </Provider>
  </StrictMode>
);
