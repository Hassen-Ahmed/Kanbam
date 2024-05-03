import { getAllLists } from "./api/gets";
import { IActionBoard } from "../types/actions.type";
import { BoardType, IList } from "../types/board.type";
import { IError } from "../types/status.type";

export const fetchAllLists = async ({
  dispatch,
}: {
  dispatch: React.Dispatch<IActionBoard>;
}) => {
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
      const sortedlist = newCards.sort(
        (a, b) => a.indexNumber - b.indexNumber
      ) as IList[];

      return { ...(listsObj as IList), cards: sortedlist };
    });

    // save res to localStorage for later we compare this storedLists/res to lists and for PUT request.

    localStorage.setItem("storedLists", JSON.stringify(res));

    dispatch({ type: "ADD_ALL_LISTS", payload: res as BoardType });
  } catch (err) {
    const error = err as IError;
    console.log(error.message);
  }
};
