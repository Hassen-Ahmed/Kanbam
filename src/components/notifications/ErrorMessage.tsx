import { BiSolidError } from "react-icons/bi";
import "./ErrorMessage.scss";

export default function ErrorMessage() {
  return (
    <div className="error-message-container">
      <div className="logo">
        <BiSolidError size={50} />
      </div>
      <h1>Sorry, something went wrong!</h1>
      <h3>Try Logout, and Login again.</h3>
    </div>
  );
}
