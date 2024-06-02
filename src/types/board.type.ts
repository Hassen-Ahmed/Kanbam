import { IActionBoard } from "./actions.type";

export interface ICard {
  id?: string;
  listId: string;
  title: string;
  indexNumber: number;
  description?: string;
  comments?: string[];
  priority?: string;
  isDragging?: boolean;
  opacity?: string;
}

export type Cards = ICard[];

export interface IList {
  id?: string;
  title: string;
  indexNumber: number;
  cards?: Cards;
  isDragging?: boolean;
  opacity?: string;
}

export type BoardType = IList[];

export interface IListsContext {
  lists: BoardType | null;
  dispatch: React.Dispatch<IActionBoard>;
  searchText: string;
  handleSearchTextUpdate: (text: string) => void;
}
