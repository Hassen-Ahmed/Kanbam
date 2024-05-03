import {
  IAuthLogin,
  IAuthRegistarion,
  IAuthRegistarionSuccess,
} from "../../types/auth.type";
import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

// card
export const postCard = async (newCard: ICard, token: string) => {
  const { data } = await kanbamApi.post(
    "/Cards",
    { ...newCard },
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );
  return data;
};

// lists
export const postList = async (newList: IList, token: string) => {
  const { data } = await kanbamApi.post("/Lists", newList, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// auth
export const postAuthLogin = async (loginDetail: IAuthLogin) => {
  const { data } = await kanbamApi.post("/auth/login", loginDetail);
  return data;
};

export const postAuthRegistarion = async (
  registarionDetail: IAuthRegistarion
) => {
  const { data }: { data: IAuthRegistarionSuccess } = await kanbamApi.post(
    "/auth/registarion",
    registarionDetail
  );
  return data;
};

// users
