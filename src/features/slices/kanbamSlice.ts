import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemDragging } from "../../types/kanbam";

type InitialStateType = {
  itemDragging: React.MutableRefObject<IItemDragging | null>;
  searchText: string;
};

const initialState: InitialStateType = {
  itemDragging: { current: null },
  searchText: "",
};

export const kanbamSlice = createSlice({
  name: "kanbam",
  initialState,
  reducers: {
    setItemDragging: (state, action: PayloadAction<IItemDragging | null>) => {
      state.itemDragging.current = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setItemDragging, setSearchText } = kanbamSlice.actions;
