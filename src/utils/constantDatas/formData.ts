import { IFormData } from "../../types/formData.type";

interface IUserDetailsSignup {
  email?: string;
  password: string;
  passwordConfirm: string;
}

type PasswordConfirmType = (password: string) => IFormData;

type LoginDataType = () => IFormData[];
type SignupDataType = (userDetails: IUserDetailsSignup) => IFormData[];
type ForgotPasswordDataType = () => IFormData[];
type ResetPasswordDataType = (userDetails: IUserDetailsSignup) => IFormData[];

// Constant data for email, password and passwordConfirm
const emailAttributeData: IFormData = {
  id: "email",
  name: "email",
  type: "email",
  errormessage: "Wrong email address!",
  placeholder: "example@gmail.com",
  label: "Email",
  required: true,
  pattern: "^[\\w]+(?:\\.[\\w]+)*@(?:[\\w]+\\.)+[\\w]{2,7}$",
};

const passwordAttributeData: IFormData = {
  id: "password",
  name: "password",
  type: "text",
  errormessage:
    "Password must be 8–20 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
  placeholder: "#Test1234",
  label: "Password",
  required: true,
  pattern:
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?])[A-Za-z0-9#$@!%&*?]{8,20}$",
};

const passwordConfirmAttributeData: PasswordConfirmType = (
  password: string
) => {
  return {
    id: "confirmpassword",
    name: "passwordConfirm",
    type: "text",
    errormessage: "Password does not match!",
    placeholder: "#Test1234",
    label: "ConfirmPassword",
    required: true,
    pattern: password,
  };
};

// exports
export const loginData: LoginDataType = () => [
  emailAttributeData,
  passwordAttributeData,
];

export const signupData: SignupDataType = (userDetails) => [
  emailAttributeData,
  passwordAttributeData,
  passwordConfirmAttributeData(userDetails.password),
];

export const forgotPasswordData: ForgotPasswordDataType = () => [
  emailAttributeData,
];

export const resetPasswordData: ResetPasswordDataType = (userDetails) => [
  passwordAttributeData,
  passwordConfirmAttributeData(userDetails.password),
];
