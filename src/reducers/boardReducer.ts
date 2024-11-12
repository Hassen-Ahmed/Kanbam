import { IActionBoard } from "../types/actions.type";
import { IListsWithCards } from "../types/kanbam";

export const boardReducer = (
  state: IListsWithCards[] | null,
  action: IActionBoard
) => {
  switch (action.type) {
    case "ADD_ALL_LISTS":
      return action.payload;

    case "ADD_LIST":
      return [...state!, ...action.payload!];

    default:
      return state;
  }
};
