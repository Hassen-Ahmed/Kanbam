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
    filtetListsById: (state, action: PayloadAction<{ id: string }>) => {
      const modifiedLists = state.lists?.filter(
        (listObj) => listObj.id !== action.payload.id
      );
      state.lists = modifiedLists!;
    },
  },
});

export const { addSingleList, addAllList, filtetListsById } =
  listsSlice.actions;
