import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { useState } from "react";
import { postAuthRegistarion } from "../../../utils/api/posts";
import { IError } from "../../../types/status.type";
import { FaArrowRotateLeft } from "react-icons/fa6";
import FormInput from "../formInput/FormInput";
import { signupData } from "../../../utils/constantDatas/formData";

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  // end of hooks

  const inputs = signupData(userDetails);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((preValue) => {
      return { ...preValue, [ev.target.name]: ev.target.value };
    });
  };

  const handleSignupForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
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
    <form onSubmit={(ev) => handleSignupForm(ev)} className="signup-form">
      {inputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={userDetails[input.name]}
            handleOnChange={handleOnChange}
          />
        );
      })}

      <div
        className="signup-form_btn"
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
    </form>
  );
}
