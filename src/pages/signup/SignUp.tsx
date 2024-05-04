import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { useState } from "react";
import { postAuthRegistarion } from "../../utils/api/posts";
import { IError } from "../../types/status.type";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  // end of hooks

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const nameOfElem = ev.target.getAttribute("name");

    if (nameOfElem === "sign-up-email") {
      setUserDetails((preValue) => {
        return { ...preValue, email: ev.target.value };
      });
    }

    if (nameOfElem === "sign-up-password") {
      setUserDetails((preValue) => {
        return { ...preValue, password: ev.target.value };
      });
    }

    if (nameOfElem === "sign-up-confirmpassword") {
      setUserDetails((preValue) => {
        return { ...preValue, passwordConfirm: ev.target.value };
      });
    }
  };

  const handleSignupForm = async () => {
    setIsRegistered(true);
    try {
      await postAuthRegistarion(userDetails);
      navigate("/auth/login");
    } catch (err) {
      setIsRegistered(false);
      const error = err as IError;
      console.log(error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup-email">
        <label htmlFor="sign-up-email">Email</label>
        <input
          id="sign-up-email"
          name="sign-up-email"
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(ev) => handleOnChange(ev)}
        />
      </div>
      <div className="signup-password">
        <label htmlFor="sign-up-password">Password</label>
        <input
          id="sign-up-password"
          name="sign-up-password"
          type="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={(ev) => handleOnChange(ev)}
        />
      </div>
      <div className="signup-password">
        <label htmlFor="sign-up-confirmpassword">ConfirmPassword</label>
        <input
          id="sign-up-confirmpassword"
          name="sign-up-confirmpassword"
          type="password"
          placeholder="ConfirmPassword"
          value={userDetails.passwordConfirm}
          onChange={(ev) => handleOnChange(ev)}
        />
      </div>

      <div
        className="signup_btn"
        onClick={handleSignupForm}
        style={{ opacity: `${isRegistered ? "0.5" : "1"}` }}
      >
        <button disabled={isRegistered ? true : false}>
          Sign up
          {isRegistered && (
            <span className="loading-notifiation">
              <FaArrowRotateLeft />
            </span>
          )}
        </button>
      </div>

      <div className="signup__back-login">
        <Link to={"/auth/login"}>
          <p>Already have an account.</p>
        </Link>
      </div>
    </div>
  );
}
