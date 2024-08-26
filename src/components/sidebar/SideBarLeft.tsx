import { useContext, useState } from "react";

import { MdAccountBox } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

import NavLinks from "./NavLinks";
import "./SideBarLeft.scss";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import styled from "styled-components";
import { themes } from "../../utils/constantDatas/themes";
import { INewTheme } from "../../types/styledComp";
import { Hr } from "../../utils/constantDatas/styledUtils";

const SideBarStyled = styled.div<INewTheme>`
  .side-bar-left {
    &,
    &__btn-toggler,
    &__container {
      background-color: ${({ $newtheme }) =>
        themes[$newtheme].bg["side_bar_01"]};
      color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};
    }

    &__btn:hover,
    &__btn-active {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover_02"]};
    }
  }
`;

const SideBarLeft = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  // end of hooks

  const handleDisplay = () =>
    setIsDisplay((preValue) => (preValue ? false : true));

  const handleActiveButton = ({ isActive }: { isActive: boolean }) =>
    isActive ? "side-bar-left__btn-active" : "";

  // JSX

  return (
    <SideBarStyled
      $newtheme={theme}
      className="side-bar-left"
      style={{
        width: isDisplay ? "auto" : "2rem",
        backgroundColor: `${themes[theme].bg["side_bar_01"]}`,
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

        <Hr $themename={theme} $group="hover" />

        <NavLinks handleActiveButton={handleActiveButton} />
      </div>
    </SideBarStyled>
  );
};

export default SideBarLeft;
