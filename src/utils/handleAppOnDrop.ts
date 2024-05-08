import { BoardType, IList, Cards } from "../types/board.type";
import { IError } from "../types/status.type";
import { updateCard, updateList } from "./api/updates";

export const handleAppOnDrop = (lists: BoardType | null) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  // on this onDrop update reorderd lists and card
  const storedLists = localStorage.getItem("storedLists");

  if (!storedLists) return;
  const pareseStoredLists = JSON.parse(storedLists);

  if (lists == undefined) return;

  // for lists only difference checking
  let isThereSomeListsDifference = false;
  const listsForPutRequest = [];

  for (let i = 0; i < lists?.length; i++) {
    if (lists[i].title != pareseStoredLists[i].title) {
      isThereSomeListsDifference = true;

      listsForPutRequest.push({
        title: lists[i].title,
        id: lists[i].id as string,
        indexNumber: lists[i].indexNumber,
      });
    }
  }

  // reset localStorage of storedLists with edited lists

  if (isThereSomeListsDifference) {
    localStorage.setItem("storedLists", JSON.stringify(lists));

    try {
      asyncUpdaterList(listsForPutRequest, token);
    } catch (err) {
      const error = err as IError;
      console.log(`Updating List err: ${error.message}`);
    }
  } else {
    // for cards only if the lists result is ok no difference.
    let isThereSomeCardsDiff = false;
    const cardsForPutRequest: Cards = [];
    for (let j = 0; j < lists?.length; j++) {
      const updatedCardsFromLists = lists[j].cards;
      const cardsFromStoredLists = pareseStoredLists[j].cards;
      if (updatedCardsFromLists?.length == undefined) return;
      for (let i = 0; i < updatedCardsFromLists?.length; i++) {
        if (updatedCardsFromLists[i].title != cardsFromStoredLists[i]?.title) {
          isThereSomeCardsDiff = true;

          cardsForPutRequest.push({
            id: updatedCardsFromLists[i].id,
            listId: lists[j].id as string,
            indexNumber: updatedCardsFromLists[i].indexNumber,
            title: updatedCardsFromLists[i].title,
            description: updatedCardsFromLists[i].description,
            comments: updatedCardsFromLists[i].comments,
            priority: updatedCardsFromLists[i].priority,
          });
        }
      }
    }
    // reset localStorage of storedLists with edited lists

    if (isThereSomeCardsDiff) {
      try {
        asyncUpdateCard(cardsForPutRequest, token);
      } catch (err) {
        const error = err as IError;
        console.log(`Updating cards err: ${error.message}`);
      }
    }
  }
};

async function asyncUpdaterList(lists: IList[], token: string) {
  return Promise.all(
    lists.map(async (listObj) => {
      return await updateList(listObj.id!, listObj, token);
    })
  );
}

async function asyncUpdateCard(cards: Cards, token: string) {
  return Promise.all(
    cards.map((card) => {
      return updateCard(card.id!, card, token);
    })
  );
}
