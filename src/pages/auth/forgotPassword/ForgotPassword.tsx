import React, { useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { forgotPasswordData } from "../../../utils/constantDatas/formData";
import { logger } from "../../../utils/logger";
import { useAppDispath } from "../../../features/hooks";
import { toasterHandler } from "../../../utils/toaster";
import FormInput from "../formInput/FormInput";
import usePosts from "../../../utils/api/usePosts";
import { IError, StatusType } from "../../../types/kanbam";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const { postAuthForgotPassword } = usePosts();
  const dispatchRdx = useAppDispath();
  const [userEmail, setUserEmail] = useState("");
  const [requestStatus, setRequestStatus] = useState<StatusType>("idle");

  // end of hooks

  const formData = forgotPasswordData();

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(() => ev.target.value);
    setRequestStatus("idle");
  };

  const handleForgotPasswordForm = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();
    setRequestStatus("loading");

    try {
      await postAuthForgotPassword(userEmail);

      setRequestStatus("idle");
      toasterHandler({
        dispathFun: dispatchRdx,
        message:
          "Password reset instructions sent to your email. Check your inbox.",
        heading: `Email sent.`,
      });
    } catch (err) {
      setRequestStatus("failed");
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Something went wrong, try again later!",
        notificationType: "error",
        duration: 10_000,
      });

      const error = err as IError;
      logger("error", error.message);
    }
  };

  // JSX

  return (
    <form
      onSubmit={handleForgotPasswordForm}
      className="forgot-password-form"
      aria-live="polite"
    >
      <h2 className="heading">Reset your password!</h2>
      {formData.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={userEmail}
            aria-label={input.label}
            handleOnChange={handleOnChange}
          />
        );
      })}

      <div
        className={`forgot-password_btn ${
          requestStatus !== "idle" ? "button-disabled" : ""
        }`}
      >
        <button
          disabled={requestStatus !== "idle"}
          aria-disabled={requestStatus !== "idle"}
          aria-live="polite"
          aria-label="Reset my password button"
        >
          {requestStatus === "loading" ? "Sending..." : "Reset my password"}
          {requestStatus === "loading" && (
            <span className="loading-notifiation">
              <FaArrowRotateLeft />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
