import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

// cards
export const deleteCardById = async (id: string, token: string) => {
  const { data } = await kanbamApi.delete<ICard>(`/cards/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// lists

export const deleteListsById = async (id: string, token: string) => {
  const { data } = await kanbamApi.delete<IList>(`/Lists/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};
