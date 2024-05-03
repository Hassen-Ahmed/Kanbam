import { Outlet } from "react-router-dom";
import NavBar from "../../components/nav/NavBar";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { useContext } from "react";
import { handleAppOnDrop } from "../../utils/handleAppOnDrop";
import "./Kanbam.scss";

export default function Kanbam() {
  const { lists } = useContext(ListsContext) as IListsContext;

  return (
    <div className="kanbam" onDrop={() => handleAppOnDrop(lists)}>
      <NavBar />
      <div className="kanbam__sub">
        <SideBarLeft />
        <div className="kanbam__outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
