import { useState } from "react";
import ButtonAccount from "../account/ButtonAccount";
import MenuAccount from "../account/MenuAccount";
import SearchBox from "./SearchBox";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../features/hooks";
import "./NavBar.scss";

const NavBarStyled = styled.div<INewTheme>`
  opacity: 0.6;
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
  }

  border: 0.1rem solid
    ${({ $themeList, $newtheme }) => $themeList[$newtheme].border["secondary"]};

  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["sideBar"]};
  color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].font["tertiary"]};
`;

const NavBar = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] =
    useState<boolean>(false);
  const { themeName, themeList } = useAppSelector((state) => state.theme);
  const location = useLocation();

  return (
    <NavBarStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="nav-bar"
    >
      <div className="nav-bar__left">
        {!location.pathname.includes("kanbam/ds") && <SearchBox />}
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
