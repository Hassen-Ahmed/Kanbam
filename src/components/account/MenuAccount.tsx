import MenuAccountLogo from "./MenuAccountLogo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { INewTheme } from "../../types/styledComp";
import { Hr } from "../../utils/constantDatas/styledUtils";
import usePosts from "../../utils/api/usePosts";
import ThemeList from "./components/ThemeList";
import { useAppSelector } from "../../features/hooks";
import "./MenuAccount.scss";

const MenuStyled = styled.div<INewTheme>`
  .menu {
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["primary"]};
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["menu"]};

    border: 0.1rem solid
      ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].border["secondary"]};

    &__logo {
      &--icon {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["buttonAccount"]};
      }
      &--photo {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["navGlass"]};
      }
    }

    &__logout,
    &__workspaces,
    .theme-btn-container,
    &__theme--list li {
      &:hover {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["hover"]};
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
  const { postAuthRevoke } = usePosts();
  const { themeName, themeList } = useAppSelector((state) => state.theme);

  const handleLogout = async () => {
    const newTab = window.open("/auth/login");

    if (newTab) {
      window.close();
    }

    localStorage.clear();
    await postAuthRevoke();
  };

  const handleDonationPayment = () => {
    window.open("/donation-payment", "_blank");
  };

  return (
    <>
      {!isAccountMenuVisible ? null : (
        <MenuStyled
          $themeList={themeList}
          $newtheme={themeName}
          className="menu-account"
          style={{
            zIndex: isAccountMenuVisible ? 2100 : 0,
          }}
        >
          <div className="menu">
            <h2 className="menu__heading">Account</h2>
            <MenuAccountLogo />
            <Hr
              $themeList={themeList}
              $themename={themeName}
              $group="secondary"
            />
            <div className="theme-btn-container">
              <label htmlFor="menu-theme">
                <div className="theme-btn-main">
                  <h2 className="heading">Theme </h2>
                </div>
              </label>
            </div>
            <input type="checkbox" name="menu-theme" id="menu-theme" />
            <div id="themes">
              <ThemeList />
            </div>
            <Link
              className="menu__workspaces"
              to={`/kanbam/w/`}
              onClick={() => setIsAccountMenuVisible(false)}
            >
              <h2 className="menu__workspaces--text">Workspaces</h2>
            </Link>

            <div className="menu__logout" onClick={handleLogout}>
              <h2 className="menu__logout--text">Logout</h2>
            </div>

            {/* This is the donation button */}
            <div className="menu__donate" onClick={handleDonationPayment}>
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
