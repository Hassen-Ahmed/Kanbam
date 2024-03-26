import { useState } from "react";
import ButtonAccount from "../account/ButtonAccount";
import MenuAccount from "../account/MenuAccount";
import Logo from "./Logo";
import "./NavBar.scss";

export default function NavBar() {
  const [isAccountMenuVisible, setIsAccountMenuVisible] =
    useState<boolean>(false);

  return (
    <div className="nav-bar">
      <Logo />
      <ButtonAccount setIsAccountMenuVisible={setIsAccountMenuVisible} />
      <MenuAccount
        isAccountMenuVisible={isAccountMenuVisible}
        setIsAccountMenuVisible={setIsAccountMenuVisible}
      />
    </div>
  );
}
