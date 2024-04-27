import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

// card

export const updateCard = async (id: string, updatedCard: ICard) => {
  const { data } = await kanbamApi.put(`/Cards/${id}`, updatedCard);
  return data;
};

// lists

export const updateList = async (id: string, updatedList: IList) => {
  const { data } = await kanbamApi.put(`/Lists/${id}`, updatedList);
  return data;
};

// users
// auth
