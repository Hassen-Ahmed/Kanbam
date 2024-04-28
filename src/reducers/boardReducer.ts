import { IActionBoard } from "../types/actions.type";
import { BoardType } from "../types/board.type";

export const boardReducer = (state: BoardType | null, action: IActionBoard) => {
  switch (action.type) {
    case "GET_ALL_LISTS":
      return action.payload;

    case "ADD_LIST":
      return [...state!, ...action.payload];

    default:
      return state;
  }
};
