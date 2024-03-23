import { FaTrello } from "react-icons/fa";
import "./Logo.scss";
export default function Logo() {
  return (
    <div className="logo-kanbam">
      <FaTrello size={20} />
      <h1>Kanbam</h1>
    </div>
  );
}
