import { useContext } from "react";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { themes } from "../../utils/constantDatas/themes";
import { INewTheme } from "../../types/styledComp";
import { Hr } from "../../utils/constantDatas/styledUtils";
import "./SideBarLeft.scss";
import { MdAccountCircle } from "react-icons/md";

const SideBarStyled = styled.div<INewTheme>`
  .side-bar-left {
    &,
    &__btn-toggler,
    &__container {
      background-color: ${({ $newtheme }) =>
        themes[$newtheme].bg["side_bar_01"]};
      color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};
    }

    &__container {
      border: 0.1rem solid
        ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
    }

    &__btn:hover,
    &__btn-active {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover_02"]};
    }
  }
`;

const SideBarLeft = () => {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const handleActiveButton = ({ isActive }: { isActive: boolean }) =>
    isActive ? "side-bar-left__btn-active" : "";

  return (
    <SideBarStyled $newtheme={theme} className="side-bar-left">
      <div className="side-bar-left__container">
        <div className="side-bar-left__btn--workspace ">
          <MdAccountCircle size={40} />
        </div>

        <Hr $themename={theme} $group="hover" />

        <NavLinks handleActiveButton={handleActiveButton} />
      </div>
    </SideBarStyled>
  );
};

export default SideBarLeft;
