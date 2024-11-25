import { Outlet } from "react-router-dom";
import "./Auth.scss";

export default function Auth() {
  return (
    <div className="auth">
      <Outlet />
    </div>
  );
}
