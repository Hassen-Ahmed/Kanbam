import React, { useContext, useState } from "react";
import "./LogIn.scss";
import { Link } from "react-router-dom";
import { postAuthLogin } from "../../utils/api/posts";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { fetchAllLists } from "../../utils/fetchAllLists";
import { useNavigate } from "react-router-dom";
import { IError } from "../../types/status.type";

export default function LogIn() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useContext(ListsContext) as IListsContext;
  const navigate = useNavigate();

  // end of hooks

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const nameOfElem = ev.target.getAttribute("name");

    if (nameOfElem === "log-in-email") {
      setUserDetails((preValue) => {
        return { ...preValue, email: ev.target.value };
      });
    }

    if (nameOfElem === "login-password") {
      setUserDetails((preValue) => {
        return { ...preValue, password: ev.target.value };
      });
    }
  };

  const handleLoginForm = async () => {
    try {
      const { token }: { token: string } = await postAuthLogin(userDetails);
      localStorage.setItem("token", token);

      fetchAllLists({ dispatch });

      navigate("/kanbam/board");
    } catch (err) {
      const error = err as IError;
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-email">
        <label htmlFor="log-in-email">Email</label>
        <input
          id="log-in-email"
          name="log-in-email"
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(ev) => handleOnChange(ev)}
        />
      </div>
      <div className="login-password">
        <label htmlFor="log-in-password">Password</label>
        <input
          id="log-in-password"
          name="login-password"
          type="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={(ev) => handleOnChange(ev)}
        />
      </div>

      <div className="login_btn" onClick={handleLoginForm}>
        <button>Log in</button>
      </div>
      <div className="login__create-account">
        <Link to={"/auth/signup"}>
          <p>Create new account.</p>
        </Link>
      </div>
    </div>
  );
}
