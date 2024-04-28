import { BoardType } from "./board.type";

export type IActionBoard = {
  type: "ADD_LIST" | "ADD_ALL_LISTS" | null;
  payload: BoardType;
};
