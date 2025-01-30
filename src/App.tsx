import ToastContainer from "./components/notifications/ToastContainer.tsx";
import RouterMain from "./router/RouterMain";

export default function App() {
  return (
    <>
      <RouterMain />
      <ToastContainer />
    </>
  );
}
