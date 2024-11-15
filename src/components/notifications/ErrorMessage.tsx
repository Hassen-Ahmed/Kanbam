import { BiSolidError } from "react-icons/bi";
import "./ErrorMessage.scss";
import { useNavigate } from "react-router-dom";

export default function ErrorMessage() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="error-message-container">
      <div className="error-message">
        <div className="logo">
          <BiSolidError size={50} />
        </div>
        <h1>Sorry, something went wrong!</h1>
        <h3>Try Logout, and Login again.</h3>
        <div className="error-message__logout-btn">
          <button onClick={handleNavigation}>Logout!</button>
        </div>
      </div>
    </div>
  );
}
