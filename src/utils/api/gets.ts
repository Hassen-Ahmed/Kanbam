import { ICard, IList } from "../../types/board.type";
import { kanbamApi, authorizationToken } from "./baseApi";

// cards

console.log("Is this dev true ? ==>", import.meta.env.DEV);
console.log("Is this prod true ? ==>", import.meta.env.PROD);

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
      listSingle.opacity = "1";
      listSingle.isDragging = false;

      const id = listSingle.id == undefined ? "" : listSingle.id;
      const data = await getAllCardByListId(id);
      const modifiedData = data.map((card) => {
        card.opacity = "1";
        card.isDragging = false;
        return card;
      });

      return { ...listSingle, list: modifiedData };
    })
  );

  return await listsWithCards;
};
