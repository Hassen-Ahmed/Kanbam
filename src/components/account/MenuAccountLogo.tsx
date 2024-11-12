import { useContext } from "react";
import { ImCamera } from "react-icons/im";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";

export default function MenuAccountLogo() {
  const { userDetail } = useContext(KanbamContext) as IkanbamContext;
  return (
    <div className="menu__logo">
      <div className="menu__logo--icon">
        <p>{userDetail?.userName.slice(0, 2).toUpperCase()}</p>
      </div>
      <div className="menu__logo--photo">
        <ImCamera size={16} />
      </div>
      <div className="menu__logo--texts">
        <h2 className="menu__logo--user">{userDetail?.userName}</h2>
        <h3 className="menu__logo--email">{userDetail?.email}</h3>
      </div>
    </div>
  );
}
