import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./assets/style/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
