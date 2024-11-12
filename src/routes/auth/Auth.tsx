import { Outlet, useNavigate } from "react-router-dom";
import "./Auth.scss";
import { useEffect, useState } from "react";
import { isTokenAuthenticated } from "../../utils/jwtAuth";
import Loading from "../../components/notifications/Loading";

export default function Auth() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenAuthenticated()) {
      navigate("/");
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
  }, [navigate]);

  if (isUserAuthenticated)
    return (
      <div className="loading-notification__container">
        <Loading />
      </div>
    );

  return (
    <div className="auth">
      <Outlet />
    </div>
  );
}
