import { FaTrello, FaChevronRight } from "react-icons/fa";
import { PiTableLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { TfiDashboard } from "react-icons/tfi";
import { MdHelpOutline, MdAccountBox } from "react-icons/md";

import "./SideBarLeft.scss";
import { useState } from "react";

export default function SideBarLeft() {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  const handleDisplay = () => {
    setIsDisplay((preValue) => {
      return preValue ? false : true;
    });
  };

  return (
    <div
      className="side-bar-left"
      style={{
        zIndex: 3000,
        width: isDisplay ? "auto" : "2rem",
      }}
    >
      <div
        className={`side-bar-left__btn-toggler ${isDisplay && "toggler--on"}`}
        onClick={handleDisplay}
      >
        <FaChevronRight />
      </div>

      <div
        className="side-bar-left__container"
        style={{ display: isDisplay ? "block" : "none" }}
      >
        <div className="side-bar-left__btn--workspace side-bar-left__btn">
          <MdAccountBox size={40} />
          <div>
            <h3>hassenbet23@gmain.com</h3>
            <h3>workspace</h3>
          </div>
        </div>
        <hr />

        <div className="side-bar-left__btn--board side-bar-left__btn">
          <FaTrello />
          Board
        </div>
        <div className="side-bar-left__btn--table side-bar-left__btn">
          <PiTableLight />
          Table
        </div>
        <div className="side-bar-left__btn--calender side-bar-left__btn">
          <SlCalender />
          Calender
        </div>
        <div className="side-bar-left__btn--dashboard side-bar-left__btn">
          <TfiDashboard />
          Dashboard
        </div>
        <div className="side-bar-left__btn--help side-bar-left__btn">
          <MdHelpOutline />
          Help
        </div>
      </div>
    </div>
  );
}
