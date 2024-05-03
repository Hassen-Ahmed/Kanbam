import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

// card
export const updateCard = async (
  id: string,
  updatedCard: ICard,
  token: string
) => {
  const { data } = await kanbamApi.put(`/Cards/${id}`, updatedCard, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// lists

export const updateList = async (
  id: string,
  updatedList: IList,
  token: string
) => {
  const { data } = await kanbamApi.put(`/Lists/${id}`, updatedList, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// users
// auth
