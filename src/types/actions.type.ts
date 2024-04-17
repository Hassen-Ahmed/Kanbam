import { BoardType } from "./board.type";

export type IActionBoard = {
  type: "ADD_LIST" | "GET_ALL_LISTS";
  payload: BoardType;
};
