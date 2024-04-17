import themeLight from "/theme-light.svg";
import themeDark from "/theme-dark.svg";
import { useContext } from "react";
import { KanbamContext, IkanbamContext } from "../../context/kanbamContext";

export default function ButtonTheme() {
  const { themeSetter } = useContext(KanbamContext) as IkanbamContext;

  const handleTheme = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const id = ev.currentTarget.id;

    if (id == "theme-light__btn") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
      themeSetter("light");
    } else if (id == "theme-dark__btn") {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
      themeSetter("dark");
    }

    // id == "theme-light__btn"
    //   ? document.body.classList.add("theme-light")
    //   : document.body.classList.remove("theme-light");
  };

  return (
    <div className="menu__theme">
      <h2 className="menu__theme--heading">Theme </h2>
      <ul className="menu__theme--list">
        <li id="theme-light__btn" onClick={(ev) => handleTheme(ev)}>
          <div className="menu__theme--btn" style={{}}>
            <img src={themeLight} alt="theme light logo" />
          </div>
          <p>Light</p>
        </li>

        <li id="theme-dark__btn" onClick={(ev) => handleTheme(ev)}>
          <div className="menu__theme--btn">
            <img src={themeDark} alt="theme dark logo" />
          </div>
          <p>Dark</p>
        </li>
      </ul>
    </div>
  );
}
