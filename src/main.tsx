import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import RouterMain from "./router/RouterMain.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import "./assets/style/main.scss";
import ToastContainer from "./components/notifications/ToastContainer.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterMain />
    </Provider>
  </StrictMode>
);
