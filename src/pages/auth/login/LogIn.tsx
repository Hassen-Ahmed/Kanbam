import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { loginData } from "../../../utils/constantDatas/formData";
import { IError } from "../../../types/status.type";

import FormInput from "../formInput/FormInput";
import "./LogIn.scss";
import usePosts from "../../../utils/api/usePosts";
import { useAppDispath } from "../../../features/hooks";
import { setAsscessToken } from "../../../features/slices/authSlice";

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
      const error = err as IError;
      console.log(error.message);
    }
  };

  // JSX

  return (
    <form onSubmit={(ev) => handleLoginForm(ev)} className="login-form">
      {formData.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={userDetails[input.name != "email" ? "password" : input.name]}
            handleOnChange={handleOnChange}
          />
        );
      })}

      <div
        className="login_btn"
        style={{ opacity: `${isAuthorizing ? "0.5" : "1"}` }}
      >
        <button disabled={isAuthorizing ? true : false}>
          Log in
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
          <span className="label">PASSWORD</span>: #test1234
        </span>
      </div>

      <div className="login__create-account">
        <Link to={"/auth/signup"}>
          <p>
            No account? <span>Create one</span>{" "}
          </p>
        </Link>
      </div>
    </form>
  );
};

export default LogIn;
