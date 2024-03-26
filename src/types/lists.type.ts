export interface ICard {
  id: number;
  title: string;
  description: string;
  isDragging: boolean;
}
export type List = ICard[];
export type ListsType = { id: number; title: string; list: List }[];
