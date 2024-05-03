export interface IAuthLogin {
  email: string;
  password: string;
}

export interface IAuthRegistarion {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IAuthRegistarionSuccess {
  message: string;
  user: {
    username: string;
    email: string;
  };
}
