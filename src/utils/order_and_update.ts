import { IActionBoard } from "../types/actions.type";
import { BoardType, ICard } from "../types/board.type";

export const handleSearchText = (
  searchText: string,
  dispatch: React.Dispatch<IActionBoard>
) => {
  const storedLists = JSON.parse(
    localStorage.getItem("storedLists")!
  ) as BoardType;

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

  dispatch({ type: "ADD_ALL_LISTS", payload: payload as BoardType });
};

export const handleUpdateLists = (
  lists: BoardType,
  cardDetail: ICard,
  cardId: string | null = null
) => {
  const deepCopiedLists = JSON.parse(JSON.stringify(lists)) as BoardType;

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
