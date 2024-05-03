export interface ICard {
  id?: string;
  listId: string;
  title: string;
  indexNumber: number;
  isDragging?: boolean;
  opacity?: string;
}

export type Cards = ICard[];

export interface IList {
  id?: string;
  title: string;
  isDragging?: boolean;
  indexNumber: number;
  cards?: Cards;
  opacity?: string;
}

export type BoardType = IList[];
