import { MdDarkMode, MdLightMode } from "react-icons/md";
export default function ButtonTheme({
  setIsAccountMenuVisible,
}: {
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="menu__theme">
      <h2 className="menu__theme--text">Theme</h2>
      <ul
        className="menu__theme--list"
        onClick={() => setIsAccountMenuVisible(false)}
      >
        <li>
          Light <MdLightMode size={18} />
        </li>
        <li>
          Dark <MdDarkMode size={18} />
        </li>
      </ul>
    </div>
  );
}
