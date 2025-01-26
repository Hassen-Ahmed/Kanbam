import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { loginData } from "../../../utils/constantDatas/formData";
import FormInput from "../formInput/FormInput";
import usePosts from "../../../utils/api/usePosts";
import { useAppDispath } from "../../../features/hooks";
import { setAsscessToken } from "../../../features/slices/authSlice";
import { logger } from "../../../utils/logger";
import { toasterHandler } from "../../../utils/toaster";
import "./LogIn.scss";
import { IError } from "../../../types/kanbam";

const LogIn = () => {
  const dispatchRdx = useAppDispath();
  const { postAuthLogin } = usePosts();
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isWrongUser, setIsWrongUser] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // end of hooks

  const formData = loginData();

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsWrongUser(false);
    setUserDetails((preValue) => {
      return { ...preValue, [ev.target.name]: ev.target.value };
    });
  };

  const handleLoginForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsAuthorizing(true);

    try {
      const data: { accessToken: string } = await postAuthLogin(userDetails);

      dispatchRdx(setAsscessToken(data.accessToken));

      navigate("/kanbam/w");
    } catch (err) {
      setIsAuthorizing(false);
      setIsWrongUser(true);

      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Wrong credential, please try again!",
        notificationType: "error",
        duration: 5000,
      });

      const error = err as IError;
      logger("error", error.message);
    }
  };

  // JSX

  return (
    <form onSubmit={handleLoginForm} className="login-form" aria-live="polite">
      {formData.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={userDetails[input.name != "email" ? "password" : input.name]}
            aria-label={input.label}
            handleOnChange={handleOnChange}
          />
        );
      })}

      <div className="login-forgot-pw">
        <Link to={"/auth/forgot-password"} aria-label="Forgot password link">
          <span>Forgot Password?</span>
        </Link>
      </div>

      <div className={`login_btn ${isAuthorizing ? "button-disabled" : ""}`}>
        <button
          disabled={isAuthorizing}
          aria-live="polite"
          aria-label="Log in button"
        >
          {isAuthorizing ? "Sending..." : "Log in"}
          {isAuthorizing && (
            <span className="loading-notifiation">
              <FaArrowRotateLeft />
            </span>
          )}
        </button>
      </div>

      <div className="wrong-user">
        {isWrongUser && <p>Wrong credential, please try again!</p>}
      </div>

      <div className="tips">
        <span>
          <span className="label">EMAIL</span>: test@gmail.com
        </span>
        <span>
          <span className="label">PASSWORD</span>: #Test1234
        </span>
      </div>

      <div className="login__create-account">
        <Link to={"/auth/signup"} aria-label="Create new account link">
          <p>
            No account? <span>Create one</span>
          </p>
        </Link>
      </div>
    </form>
  );
};

export default LogIn;
