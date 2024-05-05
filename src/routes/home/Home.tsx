import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import { useEffect, useState } from "react";
import { isTokenAuthenticated } from "../../utils/jwtAuth";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Loading from "../../components/notifications/Loading";

const iconsSize = 30;

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
    <div className="home-container">
      <div className="home">
        <main className="home__main">
          <h2>From Hassen</h2>
          <h1>Welcome to Kanbam!</h1>
          <div className="home__main--btn">
            <Link to="/auth">
              <button>Get started!</button>
            </Link>
          </div>
        </main>
        <div className="home__links">
          <a href="https://github.com/Hassen-Ahmed/Kanbam" target="_blank">
            <FaGithub size={iconsSize} />
          </a>
          <a href="https://www.linkedin.com/in/hassen-abdela/" target="_blank">
            <FaLinkedin size={iconsSize} />
          </a>
        </div>
      </div>
      <footer className="home__footer">
        <h2>What is Kanbam:?</h2>

        <p>
          Kanbam is a web application inspired by Trello's kanban board,
          designed to help teams manage projects and tasks effectively.
        </p>
        <span>&copy;Copywrite 2024. By Hassen. </span>
      </footer>
    </div>
  );
}
