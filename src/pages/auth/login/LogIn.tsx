import React, { useContext, useState } from "react";
import "./LogIn.scss";
import { Link } from "react-router-dom";
import { postAuthLogin } from "../../../utils/api/posts";
import { IListsContext, ListsContext } from "../../../context/ListsContext";
import { fetchAllLists } from "../../../utils/fetchAllLists";
import { useNavigate } from "react-router-dom";
import { IError } from "../../../types/status.type";
import { FaArrowRotateLeft } from "react-icons/fa6";
import FormInput from "../formInput/FormInput";
import { loginData } from "../../../utils/constantDatas/formData";

export default function LogIn() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(ListsContext) as IListsContext;
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isWrongUser, setIsWrongUser] = useState(false);
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
      const { token }: { token: string } = await postAuthLogin(userDetails);
      localStorage.setItem("token", token);

      fetchAllLists({ dispatch });
      navigate("/kanbam/board");
    } catch (err) {
      setIsAuthorizing(false);
      setIsWrongUser(true);
      const error = err as IError;
      console.log(error.message);
    }
  };

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
        <span>Email: hassen@gmail.com</span>
        <span>PW: #hassenbest1</span>
      </div>
      <div className="login__create-account">
        <Link to={"/auth/signup"}>
          <p>Create new account.</p>
        </Link>
      </div>
    </form>
  );
}
