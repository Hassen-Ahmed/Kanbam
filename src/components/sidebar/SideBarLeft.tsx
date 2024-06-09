import { useState } from "react";

import { MdAccountBox } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

import NavLinks from "./NavLinks";
import "./SideBarLeft.scss";

const SideBarLeft = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  // end of hooks

  const handleDisplay = () =>
    setIsDisplay((preValue) => (preValue ? false : true));

  const handleActiveButton = ({ isActive }: { isActive: boolean }) =>
    isActive ? "side-bar-left__btn-active" : "";

  // JSX

  return (
    <div
      className="side-bar-left"
      style={{
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

        <NavLinks handleActiveButton={handleActiveButton} />
      </div>
    </div>
  );
};

export default SideBarLeft;
