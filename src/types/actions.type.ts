import { IListsWithCards } from "./kanbam";

export type IActionBoard = {
  type: "ADD_LIST" | "ADD_ALL_LISTS" | null;
  payload: IListsWithCards[] | null;
};
