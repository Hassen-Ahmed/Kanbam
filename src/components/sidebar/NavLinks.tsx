import { NavLink } from "react-router-dom";

import { MdHelpOutline } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { PiTableLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaTrello } from "react-icons/fa";

type ActiveButton = ({ isActive }: { isActive: boolean }) => string;

const NavLinks = ({
  handleActiveButton,
}: {
  handleActiveButton: ActiveButton;
}) => {
  return (
    <>
      <NavLink to={"/kanbam/board"} className={handleActiveButton}>
        <div className=" side-bar-left__btn">
          <FaTrello />
          Board
        </div>
      </NavLink>
      <NavLink to={"/kanbam/table"} className={handleActiveButton}>
        <div className="side-bar-left__btn">
          <PiTableLight />
          Table
        </div>
      </NavLink>
      <NavLink to={"/kanbam/calendar"} className={handleActiveButton}>
        <div className=" side-bar-left__btn">
          <SlCalender />
          Calender
        </div>
      </NavLink>
      <NavLink to={"/kanbam/dashboard"} className={handleActiveButton}>
        <div className="side-bar-left__btn">
          <TfiDashboard />
          Dashboard
        </div>
      </NavLink>
      <div className="side-bar-left__btn--help side-bar-left__btn">
        <MdHelpOutline />
        Help
      </div>
    </>
  );
};

export default NavLinks;
