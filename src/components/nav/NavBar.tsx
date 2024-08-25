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

const NavBarStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["side_bar_01"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};

  border-bottom: 0.1rem solid
    ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

  & .logo__icon {
    background-color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};

    &::after,
    &::before {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["nav_01"]};
    }
  }
`;

const NavBar = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] =
    useState<boolean>(false);
  const { theme2 } = useContext(KanbamContext) as IkanbamContext;

  return (
    <NavBarStyled $newtheme={theme2} className="nav-bar">
      <Logo />

      <div className="nav-bar__left">
        <SearchBox />
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
