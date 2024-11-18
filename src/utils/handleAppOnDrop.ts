import { ICard, IList, IListsWithCards } from "../types/kanbam";
import { IError } from "../types/status.type";

export const handleAppOnDrop = (
  lists: IListsWithCards[] | null,
  updateList: (id: string, updatedList: IList) => Promise<void>,
  updateCard: (id: string, updatedCard: ICard) => Promise<void>
) => {
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
        id: lists[i].id as string,
        boardId: lists[i].boardId,
        title: lists[i].title,
        indexNumber: lists[i].indexNumber,
      });
    }
  }

  if (isThereSomeListsDifference) {
    try {
      asyncUpdaterList(listsForPutRequest, updateList);
      // reset localStorage of storedLists with edited lists
      localStorage.setItem("storedLists", JSON.stringify(lists));
    } catch (err) {
      const error = err as IError;
      console.log(`Updating List err: ${error.message}`);
    }
  } else {
    // for cards only if the lists result is ok no difference.
    let isThereSomeCardsDiff = false;
    const cardsForPutRequest: ICard[] = [];
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

    if (isThereSomeCardsDiff) {
      try {
        asyncUpdateCard(cardsForPutRequest, updateCard);
        // reset localStorage of storedLists with edited lists
        localStorage.setItem("storedLists", JSON.stringify(lists));
      } catch (err) {
        const error = err as IError;
        console.log(`Updating cards err: ${error.message}`);
      }
    }
  }
};

async function asyncUpdaterList(
  lists: IList[],
  updateList: (id: string, updatedList: IList) => Promise<void>
) {
  return Promise.all(
    lists.map((listObj) => {
      updateList(listObj.id!, listObj).catch((error) => ({
        error,
        listObj,
      }));
    })
  );
}

async function asyncUpdateCard(
  cards: ICard[],
  updateCard: (id: string, updatedCard: ICard) => Promise<void>
) {
  return Promise.all(
    cards.map((card) => {
      updateCard(card.id!, card).catch((error) => ({ error, card }));
    })
  );
}
