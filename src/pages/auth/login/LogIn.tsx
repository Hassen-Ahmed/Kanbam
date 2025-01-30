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
import { IError } from "../../../types/kanbam";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import "./LogIn.scss";
import { clearAllToasts } from "../../../features/slices/kanbamSlice";
import GuestTip from "./GuestTip";

const LogIn = () => {
  const dispatchRdx = useAppDispath();
  const navigate = useNavigate();
  const { postAuthLogin, postAuthGoogleLogin } = usePosts();
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isWrongUser, setIsWrongUser] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  // end of hooks

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
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

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Almost there, please wait...",
        notificationType: "info",
      });

      const data = await postAuthGoogleLogin(credentialResponse.credential!);

      dispatchRdx(clearAllToasts());
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Welcome to Kanbam!",
        notificationType: "success",
        duration: 3000,
      });
      dispatchRdx(setAsscessToken(data.accessToken));
      navigate("/kanbam/w");
    } catch (err) {
      const error = err as IError;
      logger("error", `Login failed: ${error.response?.data || error.message}`);
    }
  };

  const handleGoogleLoginError = () => {
    logger("error", `Login failed!`);
  };

  // JSX

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <form
        onSubmit={handleLoginForm}
        className="login-form"
        aria-live="polite"
      >
        {formData.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              value={
                userDetails[input.name != "email" ? "password" : input.name]
              }
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

        {GOOGLE_CLIENT_ID ? (
          <div className="login-google">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleLoginError}
              size="medium"
            />
          </div>
        ) : null}
        <div className="wrong-user">
          {isWrongUser && <p>Wrong credential, please try again!</p>}
        </div>

        <div className="login__create-account">
          <Link to={"/auth/signup"} aria-label="Create new account link">
            <p>
              No account? <span>Create one</span>
            </p>
          </Link>
        </div>
        <GuestTip />
      </form>
    </GoogleOAuthProvider>
  );
};

export default LogIn;
