import { addAllList } from "../features/slices/listsSlice";
import { ICard, IListsWithCards } from "../types/kanbam";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleSearchText = (searchText: string, dispatchRdx: any) => {
  const storedLists = JSON.parse(
    localStorage.getItem("storedLists")!
  ) as IListsWithCards[];

  let payload;

  if (!searchText) {
    payload = storedLists;
  } else {
    const updatedLists = storedLists?.map((listObj) => {
      if (listObj.cards == undefined) return listObj;

      const filteredCards = listObj.cards.filter((card) =>
        card.title.toLocaleLowerCase().includes(searchText.trim())
      );

      return { ...listObj, cards: filteredCards };
    });

    payload = updatedLists;
  }

  dispatchRdx(addAllList(payload as IListsWithCards[]));
};

export const handleUpdateLists = (
  lists: IListsWithCards[],
  cardDetail: ICard,
  cardId: string | null = null
) => {
  const deepCopiedLists = JSON.parse(
    JSON.stringify(lists)
  ) as IListsWithCards[];

  return deepCopiedLists?.map((listObj) => {
    if (listObj.id != cardDetail.listId) return listObj;

    if (cardId) {
      const updatedList = listObj.cards?.filter((card) => card.id != cardId);
      listObj.cards = updatedList;

      return listObj;
    } else {
      const updatedCards = listObj.cards?.map((card) => {
        if (card.id != cardDetail.id) return card;
        cardDetail.opacity = "1";
        return cardDetail;
      });

      return { ...listObj, cards: updatedCards };
    }
  });
};

export const handleReorderingData = (data: IListsWithCards[]) => {
  const deepCopiedData = JSON.parse(JSON.stringify(data)) as IListsWithCards[];

  deepCopiedData?.sort((a, b) => a.indexNumber - b.indexNumber);

  deepCopiedData?.map((listsObj) => {
    if (listsObj === undefined) return;

    const newListsObj = listsObj;
    const newCards = newListsObj.cards;

    if (newCards == undefined) return;

    const sortedlist = newCards
      .sort((a, b) => {
        if (a.indexNumber == b.indexNumber) {
          return newCards.indexOf(b) - newCards.indexOf(a);
        }
        return a.indexNumber - b.indexNumber;
      })
      .map((card) => {
        card.opacity = "1";
        card.isDragging = false;
      });

    return { ...(listsObj as IListsWithCards), cards: sortedlist };
  });

  return deepCopiedData;
};
