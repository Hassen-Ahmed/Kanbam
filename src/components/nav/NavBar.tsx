import { useState } from "react";

import ButtonAccount from "../account/ButtonAccount";
import MenuAccount from "../account/MenuAccount";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
import "./NavBar.scss";

const NavBar = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] =
    useState<boolean>(false);

  return (
    <div className="nav-bar">
      <Logo />

      <div className="nav-bar__left">
        <SearchBox />
        <ButtonAccount setIsAccountMenuVisible={setIsAccountMenuVisible} />
      </div>

      <MenuAccount
        isAccountMenuVisible={isAccountMenuVisible}
        setIsAccountMenuVisible={setIsAccountMenuVisible}
      />
    </div>
  );
};

export default NavBar;
