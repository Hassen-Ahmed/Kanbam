import { createPortal } from "react-dom";
import ButtonTheme from "./ButtonTheme";
import "./MenuAccount.scss";
import MenuAccountLogo from "./MenuAccountLogo";
import { useContext, useState } from "react";
import ConfettiComp from "../Confetti";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { themes } from "../../utils/constantDatas/themes";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { INewTheme } from "../../types/styledComp";
import { Hr } from "../../utils/constantDatas/styledUtils";

const MenuStyled = styled.div<INewTheme>`
  .menu {
    color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};

    &,
    &__theme--list {
      border: 0.1rem solid
        ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
    }

    &__logo {
      &--icon {
        background-color: ${({ $newtheme }) =>
          themes[$newtheme].bg["btn_account"]};
      }
      &--photo {
        background-color: ${({ $newtheme }) =>
          themes[$newtheme].bg["nav_glass"]};
      }
    }

    &,
    &__theme--list {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["menu"]};
    }

    &__logout,
    &__theme,
    &__theme--list li {
      &:hover {
        background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover"]};
      }
    }
  }
`;

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
  const { theme2 } = useContext(KanbamContext) as IkanbamContext;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <>
      {!isAccountMenuVisible ? null : (
        <MenuStyled
          $newtheme={theme2}
          className="menu-account"
          style={{
            zIndex: isAccountMenuVisible ? 2100 : 0,
          }}
        >
          <div className="menu">
            <h2 className="menu__heading">Account</h2>
            <MenuAccountLogo />
            <Hr $themename={theme2} $group="hover" />
            <ButtonTheme />
            <Hr $themename={theme2} $group="hover" />

            <div className="menu__logout" onClick={handleLogout}>
              <h2 className="menu__logout--text">Logout</h2>
            </div>

            {areWeCelebrating && createPortal(<ConfettiComp />, document.body)}

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
        </MenuStyled>
      )}
    </>
  );
};

export default MenuAccount;
