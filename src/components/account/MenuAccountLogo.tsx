import { ImCamera } from "react-icons/im";

export default function MenuAccountLogo() {
  return (
    <div className="menu__logo">
      <div className="menu__logo--icon">
        <p>HB</p>
      </div>
      <div className="menu__logo--photo">
        <ImCamera size={16} />
      </div>
      <div className="menu__logo--texts">
        <h2 className="menu__logo--user">hassen best</h2>
        <h3 className="menu__logo--email">hassenbet23@gmail.com</h3>
      </div>
    </div>
  );
}
