import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

// card

export const postCard = async (newCard: ICard) => {
  const { data } = await kanbamApi.post("/Cards", { ...newCard });
  return data;
};

// lists

export const postList = async (newList: IList) => {
  const { data } = await kanbamApi.post("/Lists", newList);
  return data;
};

// users
// auth
