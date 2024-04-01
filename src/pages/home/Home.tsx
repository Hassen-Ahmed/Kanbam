import Board from "../../components/board/Board";
import NavBar from "../../components/nav/NavBar";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import "./Home.scss";
export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <div className="home__sub">
        <SideBarLeft />
        <Board />
      </div>
    </div>
  );
}
