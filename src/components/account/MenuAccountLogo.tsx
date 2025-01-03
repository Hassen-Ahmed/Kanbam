import { ImCamera } from "react-icons/im";
import { useAppSelector } from "../../features/hooks";
import Loading from "../notifications/Loading";

export default function MenuAccountLogo() {
  const { status, profile } = useAppSelector((state) => state.profile);

  if (status === "loading") return <Loading />;

  if (status === "failed")
    return <p>Sorry, something went wrong. Try again!</p>;

  return (
    <div className="menu__logo">
      <div className="menu__logo--icon">
        <p>{profile?.userName.slice(0, 2).toUpperCase()}</p>
      </div>
      <div className="menu__logo--photo">
        <ImCamera size={16} />
      </div>
      <div className="menu__logo--texts">
        <h2 className="menu__logo--user">{profile?.userName}</h2>
        <h3 className="menu__logo--email">{profile?.email}</h3>
      </div>
    </div>
  );
}
