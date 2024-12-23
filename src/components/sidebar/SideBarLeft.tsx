import { useContext } from "react";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { INewTheme } from "../../types/styledComp";
import "./SideBarLeft.scss";
import Logo from "./Logo";

const SideBarStyled = styled.div<INewTheme>`
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
  }
  .logo__icon {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["tertiary"]};

    &::after,
    &::before {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["navBar"]};
    }
  }

  .side-bar-left {
    &,
    &__btn-toggler,
    &__container {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["sideBar"]};
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["tertiary"]};
    }

    &__container {
      border: 0.1rem solid
        ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].border["secondary"]};
    }

    &__btn:hover,
    &__btn-active {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["hoverSecondar"]};
    }
  }
`;

const SideBarLeft = () => {
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;

  const handleActiveButton = ({ isActive }: { isActive: boolean }) =>
    isActive ? "side-bar-left__btn-active" : "";

  return (
    <SideBarStyled
      $themeList={themeList}
      $newtheme={theme}
      className="side-bar-left"
    >
      <div className="side-bar-left__container">
        <div className="side-bar-left__btn--workspace ">
          <Logo />
        </div>

        <NavLinks handleActiveButton={handleActiveButton} />
      </div>
    </SideBarStyled>
  );
};

export default SideBarLeft;
