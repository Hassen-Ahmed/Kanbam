import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { isTokenAuthenticated } from "../../utils/jwtAuth";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Home.scss";

import Loading from "../../components/notifications/Loading";
import { BsPatchQuestionFill } from "react-icons/bs";
import { RiFunctionAddLine } from "react-icons/ri";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { GiHumanPyramid } from "react-icons/gi";
import { RxAccessibility } from "react-icons/rx";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

const iconsSize = 30;

export default function Home() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  const topElem = useRef(null);
  const bottomElem = useRef(null);

  const handleScrollToTopElem = () => {
    const current = topElem.current! as HTMLElement;
    current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToBottmElem = () => {
    const current = bottomElem.current! as HTMLElement;
    current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isTokenAuthenticated()) {
      navigate(`/kanbam/w`);
      setIsUserAuthenticated(true);
    } else {
      localStorage.clear();
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
    <div className="home">
      <div className="up-down">
        <IoIosArrowDropupCircle size={20} onClick={handleScrollToTopElem} />
        <hr />
        <IoIosArrowDropdownCircle size={20} onClick={handleScrollToBottmElem} />
      </div>
      <header className="home__headers" ref={topElem}>
        <div className="home__header">
          <h2>From Hassen</h2>
          <h1>Welcome to Kanbam!</h1>
          <div className="home__header--btn">
            <Link to="/auth">
              <button>Get started!</button>
            </Link>
          </div>
        </div>
        <div className="home__links">
          <a href="https://github.com/Hassen-Ahmed/Kanbam" target="_blank">
            <FaGithub size={iconsSize} color="white" />
          </a>
          <a href="https://www.linkedin.com/in/hassen-abdela/" target="_blank">
            <FaLinkedin size={iconsSize} color="white" />
          </a>
        </div>
      </header>
      <main className="home__main">
        {/* intro */}
        <div className="left-container">
          <h2 className="heading">What is Kanbam:?</h2>
          <div className="left">
            <span className="icon">
              <BsPatchQuestionFill size={100} />
            </span>
            <p className="desc">
              Kanbam is a Software as a Service(SaaS) web application inspired
              by Trello's kanban board, designed to help teams manage projects
              and tasks effectively.
            </p>
          </div>
        </div>

        {/* how */}
        <div className="right-container">
          <h2 className="heading">How it works</h2>
          <div className="right">
            <span className="icon">
              <RiFunctionAddLine size={100} />
            </span>
            <p className="desc">
              Users can create boards with lists of cards, which can be
              associated with different stages of a project. For example , a
              content writing board might have columns for ideation, backlogs,
              in-progress contents, and finished contents.
            </p>
          </div>
        </div>
        {/* features */}
        <div className="left-container">
          <h2 className="heading">Features</h2>
          <div className="left">
            <span className="icon">
              <MdOutlineFeaturedPlayList size={100} />
            </span>
            <p className="desc">
              Kanbam offers features such as drag-and-drop editing, dashboard,
              table, calendar, workflow, or task tracking and for near future I
              am going to add AI powerd feature and more.
            </p>
          </div>
        </div>

        {/* who */}
        <div className="right-container">
          <h2 className="heading">Who uses it</h2>
          <div className="right">
            <span className="icon">
              <GiHumanPyramid size={100} />
            </span>
            <p className="desc">
              Kanbam is used by teams of all kinds, personal use, and all kind
              of works.
            </p>
          </div>
        </div>
        {/* access */}
        <div className="left-container" ref={bottomElem}>
          <h2 className="heading">How to access it</h2>
          <div className="left">
            <span className="icon">
              <RxAccessibility size={100} />
            </span>
            <p className="desc">
              Kanbam is available via the website. For good experience it is
              better to use bigger screen for example tablets, laptops or
              desktops than smaller like phones.
            </p>
          </div>
        </div>
      </main>

      <footer className="home__footer">
        <span>&copy; Copywrite 2024. By Hassen. </span>
      </footer>
    </div>
  );
}
