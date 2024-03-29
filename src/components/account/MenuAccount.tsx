import ButtonTheme from "./ButtonTheme";
import "./MenuAccount.scss";
import MenuAccountLogo from "./MenuAccountLogo";

interface IMenuVisiblity {
  isAccountMenuVisible: boolean;
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuAccount: React.FC<IMenuVisiblity> = ({
  isAccountMenuVisible,
  setIsAccountMenuVisible,
}) => {
  return (
    <div className="menu-account">
      {isAccountMenuVisible && (
        <>
          <div className="menu">
            <h2 className="menu__heading">Account</h2>

            <MenuAccountLogo />
            <hr />
            <ButtonTheme setIsAccountMenuVisible={setIsAccountMenuVisible} />
            <hr />

            <div className="menu__logout">
              <h2 className="menu__logout--text">Logout</h2>
            </div>
          </div>

          <div
            className="menu__overlay"
            onClick={() => setIsAccountMenuVisible(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default MenuAccount;
