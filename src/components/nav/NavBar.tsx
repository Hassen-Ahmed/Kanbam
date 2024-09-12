import { useContext, useState } from "react";

import ButtonAccount from "../account/ButtonAccount";
import MenuAccount from "../account/MenuAccount";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
import "./NavBar.scss";
import { INewTheme } from "../../types/styledComp";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import styled from "styled-components";
import { themes } from "../../utils/constantDatas/themes";
import { useLocation } from "react-router-dom";

const NavBarStyled = styled.div<INewTheme>`
  border: 0.1rem solid
    ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

  background-color: ${({ $newtheme }) => themes[$newtheme].bg["side_bar_01"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};

  & .logo__icon {
    background-color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};

    &::after,
    &::before {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["nav_01"]};
    }
  }
`;

// <MdOutlineKeyboardCommandKey />

const NavBar = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] =
    useState<boolean>(false);
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const location = useLocation();

  return (
    <NavBarStyled $newtheme={theme} className="nav-bar">
      <Logo />

      <div className="nav-bar__left">
        {location.pathname.includes("board") && <SearchBox />}
        <ButtonAccount setIsAccountMenuVisible={setIsAccountMenuVisible} />
      </div>

      <MenuAccount
        isAccountMenuVisible={isAccountMenuVisible}
        setIsAccountMenuVisible={setIsAccountMenuVisible}
      />
    </NavBarStyled>
  );
};

export default NavBar;
