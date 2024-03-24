import { useState } from "react";
import "./MenuAccount.scss";
import { ImCamera } from "react-icons/im";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function MenuAccount() {
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(true);

  return (
    <div className="menu-account">
      {isAccountMenuVisible && (
        <>
          <div className="menu">
            <h2 className="menu__heading">Account</h2>
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

            <hr />

            <div className="menu__theme">
              <h2 className="menu__theme--text">Theme</h2>
              <ul className="menu__theme--list">
                <li>
                  Light <MdLightMode size={18} />
                </li>
                <li>
                  Dark <MdDarkMode size={18} />
                </li>
              </ul>
            </div>

            <hr />

            <div className="menu__logout">
              <h2 className="menu__logout--text">Logout</h2>
            </div>
          </div>

          <div
            className="menu__background"
            onClick={() => setIsAccountMenuVisible(false)}
          ></div>
        </>
      )}
    </div>
  );
}
