export interface ICard {
  id: string;
  listId: string;
  title: string;
  indexNumber: number;
  isDragging: boolean;
}

export type ListType = ICard[];

export interface IList {
  id?: string;
  title: string;
  isDragging?: boolean;
  indexNumber?: number;
  list?: ListType;
}
