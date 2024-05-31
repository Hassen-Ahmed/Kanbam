import themeLight from "/theme-light.svg";
import themeDark from "/theme-dark.svg";
import { useContext } from "react";
import { KanbamContext, IkanbamContext } from "../../context/kanbamContext";

const ButtonTheme = () => {
  const { themeSetter } = useContext(KanbamContext) as IkanbamContext;

  return (
    <div className="menu__theme">
      <h2 className="menu__theme--heading">Theme </h2>
      <ul className="menu__theme--list">
        <li onClick={() => themeSetter("theme-light")}>
          <div className="menu__theme--btn" style={{}}>
            <img src={themeLight} alt="theme light logo" />
          </div>
          <p>Light</p>
        </li>

        <li onClick={() => themeSetter("theme-dark")}>
          <div className="menu__theme--btn">
            <img src={themeDark} alt="theme dark logo" />
          </div>
          <p>Dark</p>
        </li>
      </ul>
    </div>
  );
};

export default ButtonTheme;
