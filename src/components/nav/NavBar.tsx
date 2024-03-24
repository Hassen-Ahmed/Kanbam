import ButtonAccount from "../account/ButtonAccount";
import MenuAccount from "../account/MenuAccount";
import Logo from "./Logo";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Logo />
      <ButtonAccount />
      <MenuAccount />
    </div>
  );
}
