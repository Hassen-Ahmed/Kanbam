import React, { useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { resetPasswordData } from "../../../utils/constantDatas/formData";
import { logger } from "../../../utils/logger";
import { useAppDispath } from "../../../features/hooks";
import { toasterHandler } from "../../../utils/toaster";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePosts from "../../../utils/api/usePosts";
import FormInput from "../formInput/FormInput";
import { IError, StatusType } from "../../../types/kanbam";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const { postAuthResetPassword } = usePosts();
  const dispatchRdx = useAppDispath();
  const [userDetails, setUserDetails] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [requestStatus, setRequestStatus] = useState<StatusType>("idle");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const resetToken = searchParams.get("resetToken");
  const resetEmail = searchParams.get("email");

  // end of hooks

  const formData = resetPasswordData(userDetails);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((preValue) => ({
      ...preValue,
      [ev.target.name]: ev.target.value,
    }));
    setRequestStatus("idle");
  };

  const handleResetPasswordForm = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();
    setRequestStatus("loading");

    try {
      if (resetEmail == null || resetToken == null) throw new Error();

      await postAuthResetPassword(resetEmail, userDetails.password, resetToken);
      setRequestStatus("idle");
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Your password has been successfully reset!",
        duration: 5000,
      });
      navigate("/auth/login");
    } catch (err) {
      setRequestStatus("failed");
      toasterHandler({
        dispathFun: dispatchRdx,
        message: "Something went wrong!",
        notificationType: "error",
        heading: `Your password has already been reset!`,
        duration: 5000,
      });

      const error = err as IError;
      logger("error", error.message);
    }
  };

  // JSX

  return (
    <form
      onSubmit={handleResetPasswordForm}
      className="reset-password-form"
      aria-live="polite"
    >
      <h2 className="heading">Change your password.</h2>
      {formData.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={userDetails[input.name as "password" | "passwordConfirm"]}
            aria-label={input.label}
            handleOnChange={handleOnChange}
          />
        );
      })}

      <div
        className={`reset-password_btn ${
          requestStatus !== "idle" ? "button-disabled" : ""
        }`}
      >
        <button
          disabled={requestStatus !== "idle"}
          aria-disabled={requestStatus !== "idle"}
          aria-label="Confirm password button"
        >
          {requestStatus === "loading" ? "Sending..." : "Confirm password"}
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

export default ResetPassword;
