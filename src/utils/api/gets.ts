import { ICard, IList } from "../../types/lists.type";
import { kanbamApi, authorizationToken } from "./baseApi";

// cards

export const getAllCardByListId = async (listId: string) => {
  const { data } = await kanbamApi.get<ICard[]>(`/cards/${listId}/list`);
  return data;
};

export const getCardByCardId = async (cardId: string) => {
  const { data } = await kanbamApi.get<ICard>(`/cards/${cardId}/card`);
  return data;
};

// lists

export const getAllLists = async () => {
  const { data } = await kanbamApi.get<IList[]>("/Lists", {
    headers: {
      Authorization: authorizationToken,
    },
  });

  const listsWithCards = Promise.all(
    data.map(async (listSingle: IList) => {
      const id = listSingle.id == undefined ? "" : listSingle.id;
      const data = await getAllCardByListId(id);

      return { ...listSingle, list: data };
    })
  );

  return await listsWithCards;
};
