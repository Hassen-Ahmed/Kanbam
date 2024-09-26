import { NavLink } from "react-router-dom";

import { MdHelpOutline } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { PiTableLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { HiViewBoards } from "react-icons/hi";

type ActiveButton = ({ isActive }: { isActive: boolean }) => string;

const NavLinks = ({
  handleActiveButton,
}: {
  handleActiveButton: ActiveButton;
}) => {
  return (
    <div className="side-bar-left__btns">
      <NavLink to={"/kanbam/board"} className={handleActiveButton}>
        <div className="side-bar-left__btn">
          <HiViewBoards />
          <p className="btn-title">Board</p>
        </div>
      </NavLink>
      <NavLink to={"/kanbam/table"} className={handleActiveButton}>
        <div className="side-bar-left__btn">
          <PiTableLight />
          <p className="btn-title">Table</p>
        </div>
      </NavLink>
      <NavLink to={"/kanbam/calendar"} className={handleActiveButton}>
        <div className="side-bar-left__btn">
          <SlCalender />
          <p className="btn-title">Calender</p>
        </div>
      </NavLink>
      <NavLink to={"/kanbam/dashboard"} className={handleActiveButton}>
        <div className="side-bar-left__btn">
          <TfiDashboard />
          <p className="btn-title">Dashboard</p>
        </div>
      </NavLink>
      <div className="side-bar-left__btn--help  side-bar-left__btn ">
        <MdHelpOutline />
        <p className="btn-title">Help</p>
      </div>
    </div>
  );
};

export default NavLinks;
