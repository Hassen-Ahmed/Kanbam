import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

// cards
export const deleteCardById = async (id: string) => {
  const { data } = await kanbamApi.delete<ICard>(`/cards/${id}`);
  return data;
};

// lists

export const deleteListsById = async (id: string) => {
  const { data } = await kanbamApi.delete<IList>(`/Lists/${id}`);
  return data;
};
