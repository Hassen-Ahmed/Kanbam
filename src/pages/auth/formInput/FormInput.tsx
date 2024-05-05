import { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import "./FormInput.scss";
import { IFormData } from "../../../types/formData.type";

interface FormInput extends IFormData {
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput(props: FormInput) {
  const [focused, setFocused] = useState(false);
  const { label, handleOnChange, ...inputProps } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlerFocus = () => {
    setFocused(true);
  };

  const handleShowPassword = () => {
    setIsPasswordVisible((preValue) => !preValue);
  };

  const type = inputProps.name.includes("password") ? "password" : "email";

  return (
    <div className="form-input">
      <label htmlFor={label.toLocaleLowerCase()}>{label}</label>
      <input
        {...inputProps}
        type={isPasswordVisible ? "text" : type}
        onChange={handleOnChange}
        onBlur={handlerFocus}
        onFocus={() =>
          inputProps.name === "passwordConfirm" && setFocused(true)
        }
        autoComplete="true"
        data-focused={focused.toString()}
      />

      {inputProps.name.includes("password") ||
      inputProps.name.includes("confirmpassword") ? (
        <span className="show-input" onClick={handleShowPassword}>
          {isPasswordVisible ? (
            <FaRegEye size={20} color="#623ff0" />
          ) : (
            <FaEyeSlash size={20} color="#623ff0" />
          )}
        </span>
      ) : null}

      <span className="error-message">{inputProps.errormessage}</span>
    </div>
  );
}
