import { Outlet } from "react-router-dom";
import "./Auth.scss";

export default function Auth() {
  return (
    <div className="auth">
      <h2>Welcome again!</h2>
      <Outlet />
    </div>
  );
}
