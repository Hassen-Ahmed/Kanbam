import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListsWithCards } from "../../types/kanbam";

interface IInitialState {
  lists: IListsWithCards[] | null;
}

const initialState: IInitialState = {
  lists: null,
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addSingleList: (state, action: PayloadAction<IListsWithCards>) => {
      state.lists = [...state.lists!, action.payload];
    },
    addAllList: (state, action: PayloadAction<IListsWithCards[] | null>) => {
      state.lists = action.payload;
    },
  },
});

export const { addSingleList, addAllList } = listsSlice.actions;
