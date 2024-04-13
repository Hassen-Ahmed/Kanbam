import ButtonTheme from "./ButtonTheme";
import "./MenuAccount.scss";
import MenuAccountLogo from "./MenuAccountLogo";

interface IMenuVisiblity {
  isAccountMenuVisible: boolean;
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuAccount = ({
  isAccountMenuVisible,
  setIsAccountMenuVisible,
}: IMenuVisiblity) => {
  return (
    <>
      {!isAccountMenuVisible ? null : (
        <div
          className="menu-account"
          style={{
            zIndex: isAccountMenuVisible ? 2000 : 0,
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
                <div className="menu__logout">
                  <h2 className="menu__logout--text">Logout</h2>
                </div>
                <div className="menu__donate">
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
