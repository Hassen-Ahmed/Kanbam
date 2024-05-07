import { IActionBoard } from "../types/actions.type";
import { BoardType } from "../types/board.type";

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
