import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { signupData } from "../../../utils/constantDatas/formData";
import FormInput from "../formInput/FormInput";
import usePosts from "../../../utils/api/usePosts";
import { logger } from "../../../utils/logger";
import { useAppDispath } from "../../../features/hooks";
import { toasterHandler } from "../../../utils/toaster";
import { IError, StatusType } from "../../../types/kanbam";
import "./SignUp.scss";

export default function SignUp() {
  const { postAuthRegistarion } = usePosts();
  const dispatchRdx = useAppDispath();
  const [requestStatus, setRequestStatus] = useState<StatusType>("idle");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();

  // end of hooks

  const formData = signupData(userDetails);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((preValue) => {
      return { ...preValue, [ev.target.name]: ev.target.value };
    });
    setRequestStatus("idle");
  };

  const handleSignupForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setRequestStatus("loading");

    try {
      await postAuthRegistarion(userDetails);
      setRequestStatus("idle");
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Your registration was successful!",
        duration: 5000,
      });
      navigate("/auth/login");
    } catch (err) {
      setRequestStatus("failed");
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Something went wrong!",
        notificationType: "error",
      });

      const error = err as IError;
      logger("error", error.message);
    }
  };

  const loadingNotification = requestStatus === "loading" && (
    <span className="loading-notifiation">
      <FaArrowRotateLeft />
    </span>
  );

  // JSX

  return (
    <form
      onSubmit={handleSignupForm}
      className="signup-form"
      aria-live="polite"
    >
      {formData.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={userDetails[input.name]}
            aria-label={input.label}
            handleOnChange={handleOnChange}
          />
        );
      })}

      <div
        className={`signup-form_btn ${
          requestStatus !== "idle" ? "button-disabled" : ""
        }`}
      >
        <button
          disabled={requestStatus !== "idle"}
          aria-disabled={requestStatus !== "idle"}
          aria-live="polite"
          aria-label="Sign up button"
        >
          {requestStatus === "loading" ? "Sending..." : "Sign up"}
          {loadingNotification}
        </button>
      </div>

      <div className="signup__back-login">
        <Link to={"/auth/login"} aria-label="Login link">
          <p>
            Already have an account? <span> Login</span>
          </p>
        </Link>
      </div>
    </form>
  );
}
