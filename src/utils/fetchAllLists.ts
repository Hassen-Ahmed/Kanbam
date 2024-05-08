import { getAllLists } from "./api/gets";
import { IList } from "../types/board.type";
import { IError } from "../types/status.type";

export const fetchAllLists = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await getAllLists(token);

    res?.sort((a, b) => a.indexNumber - b.indexNumber);

    res?.map((listsObj: IList) => {
      if (listsObj === undefined) return;

      const newListsObj = listsObj as IList;
      const newCards = newListsObj.cards;

      if (newCards == undefined) return;
      const sortedlist = newCards
        .sort((a, b) => a.indexNumber - b.indexNumber)
        .map((card) => {
          card.opacity = "1";
          card.isDragging = false;
        });

      return { ...(listsObj as IList), cards: sortedlist };
    });

    return res;
    // dispatch({ type: "ADD_ALL_LISTS", payload: res as BoardType });
  } catch (err) {
    const error = err as IError;
    console.log(error.message);
  }
};
