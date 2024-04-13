export interface ICard {
  id: number;
  title: string;
  description: string;
  isDragging: boolean;
}

export type ListType = ICard[];

export interface IList {
  id: number;
  title: string;
  isDragging: boolean;
  indexNumber: number;
  list: ListType;
}
