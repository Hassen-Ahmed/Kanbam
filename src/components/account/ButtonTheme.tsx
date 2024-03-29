import { MdDarkMode, MdLightMode } from "react-icons/md";
export default function ButtonTheme({
  setIsAccountMenuVisible,
}: {
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleTheme = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const id = ev.currentTarget.id;

    id == "theme-light__btn"
      ? document.body.classList.add("theme-light")
      : document.body.classList.remove("theme-light");
  };
  return (
    <div className="menu__theme">
      <h2 className="menu__theme--text">Theme</h2>
      <ul
        className="menu__theme--list"
        onClick={() => setIsAccountMenuVisible(false)}
      >
        <li id="theme-light__btn" onClick={(ev) => handleTheme(ev)}>
          Light <MdLightMode size={18} />
        </li>
        <li id="theme-dark__btn" onClick={(ev) => handleTheme(ev)}>
          Dark <MdDarkMode size={18} />
        </li>
      </ul>
    </div>
  );
}
