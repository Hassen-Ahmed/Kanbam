import { IFormData } from "../../types/formData.type";

interface IUserDetailsSignup {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const loginData = () => {
  const data: IFormData[] = [
    {
      id: "email",
      name: "email",
      type: "email",
      errormessage: "Wrong email address",
      placeholder: "Email",
      label: "Email",
      required: true,
      pattern: "^[\\w]+(?:\\.[\\w]+)*@(?:[\\w]+\\.)+[\\w]{2,7}$",
    },
    {
      id: "password",
      name: "password",
      type: "text",
      errormessage:
        "Password should be 8-20 character and should include at list 1 letter, 1 number and only 1 spcecial character.",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$@!%&*?])[A-Za-z0-9#$@!%&*?]{8,20}$",
    },
  ];
  return data;
};

export const signupData = (userDetails: IUserDetailsSignup) => {
  const data: IFormData[] = [
    {
      id: "email",
      name: "email",
      type: "email",
      errormessage: "Wrong email address",
      placeholder: "Username",
      label: "Email",
      required: true, 
      pattern: "^[\\w]+(?:\\.[\\w]+)*@(?:[\\w]+\\.)+[\\w]{2,7}$",

    },
    {
      id: "password",
      name: "password",
      type: "text",
      errormessage:
        "Password should be 8-20 character and should include at list 1 letter, 1 number and only 1 spcecial character.",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$@!%&*?])[A-Za-z0-9#$@!%&*?]{8,20}$",
    },
    {
      id: "confirmpassword",
      name: "passwordConfirm",
      type: "text",
      errormessage: "Password does not match!",
      placeholder: "ConfirmPassword",
      label: "ConfirmPassword",
      required: true,
      pattern: userDetails.password,
    },
  ];
  return data;
};
