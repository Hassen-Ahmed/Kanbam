import { useContext, useState } from "react";

import ButtonAccount from "../account/ButtonAccount";
import MenuAccount from "../account/MenuAccount";
import SearchBox from "./SearchBox";
import { INewTheme } from "../../types/styledComp";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import styled from "styled-components";
import { themes } from "../../utils/constantDatas/themes";
import "./NavBar.scss";

const NavBarStyled = styled.div<INewTheme>`
  opacity: 0.6;
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
  }

  border: 0.1rem solid
    ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

  background-color: ${({ $newtheme }) => themes[$newtheme].bg["side_bar_01"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};
`;

const NavBar = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] =
    useState<boolean>(false);
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  return (
    <NavBarStyled $newtheme={theme} className="nav-bar">
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
