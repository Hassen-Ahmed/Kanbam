import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import { useEffect, useState } from "react";
import { isTokenAuthenticated } from "../../utils/jwtAuth";

import Loading from "../../components/notifications/Loading";

export default function Home() {
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
    <div className="home">
      <h1>⭐️ Welcome to Kanbam! ⭐️</h1>
      <p>
        Kanbam is a web application inspired by Trello's kanban board, designed
        to help teams manage projects and tasks effectively.
      </p>

      <div className="home__btn">
        <Link to="/auth">
          <button>Get started!</button>
        </Link>
      </div>
    </div>
  );
}
