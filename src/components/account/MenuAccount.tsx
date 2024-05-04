import { createPortal } from "react-dom";
import ButtonTheme from "./ButtonTheme";
import "./MenuAccount.scss";
import MenuAccountLogo from "./MenuAccountLogo";
import { useState } from "react";
import ConfettiComp from "../Confetti";
import { useNavigate } from "react-router-dom";

interface IMenuVisiblity {
  isAccountMenuVisible: boolean;
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuAccount = ({
  isAccountMenuVisible,
  setIsAccountMenuVisible,
}: IMenuVisiblity) => {
  const [areWeCelebrating, setAreWeCelebrating] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      console.log("loged out!");
      navigate("/");
    }, 100);
  };

  return (
    <>
      {!isAccountMenuVisible ? null : (
        <div
          className="menu-account"
          style={{
            zIndex: isAccountMenuVisible ? 2100 : 0,
          }}
        >
          {isAccountMenuVisible && (
            <>
              <div className="menu">
                <h2 className="menu__heading">Account</h2>
                <MenuAccountLogo />
                <hr />
                <ButtonTheme />
                <hr />

                <div className="menu__logout" onClick={handleLogout}>
                  <h2 className="menu__logout--text">Logout</h2>
                </div>

                {areWeCelebrating &&
                  createPortal(<ConfettiComp />, document.body)}

                <div
                  className="menu__donate"
                  onClick={() => {
                    setAreWeCelebrating((preValue) => {
                      return preValue ? false : true;
                    });
                  }}
                >
                  <h2 className="menu__donate--text">Donate</h2>
                </div>
              </div>

              <div
                className="menu__overlay"
                onClick={() => setIsAccountMenuVisible(false)}
              ></div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MenuAccount;
