import { ICard, IList } from "../../types/board.type";
import { kanbamApi } from "./baseApi";

const token = localStorage.getItem("token");

// cards
export const getAllCardByListId = async (listId: string) => {
  const { data } = await kanbamApi.get<ICard[]>(`/cards/${listId}/list`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

export const getCardByCardId = async (cardId: string) => {
  const { data } = await kanbamApi.get<ICard>(`/cards/${cardId}/card`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// lists
export const getAllLists = async (token: string) => {
  const { data } = await kanbamApi.get<IList[]>("/Lists", {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return data;
};
