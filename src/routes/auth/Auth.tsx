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
      navigate("/kanbam/board");
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
  }, []);

  if (isUserAuthenticated)
    return (
      <>
        <Loading />;
      </>
    );

  return (
    <div className="auth">
      <h2>⭐️ Welcome again! ⭐️</h2>
      <Outlet />
    </div>
  );
}
