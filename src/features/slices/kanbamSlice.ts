import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemDragging } from "../../types/kanbam";

export type ToastMessageType = "info" | "success" | "error" | "warning";

export interface Toast {
  id?: string;
  message: string | null;
  heading: string | null;
  notificationType: ToastMessageType;
  duration: number;
}

type InitialStateType = {
  itemDragging: React.MutableRefObject<IItemDragging | null>;
  searchText: string;
  toasts: Toast[];
};

const initialState: InitialStateType = {
  itemDragging: { current: null },
  searchText: "",
  toasts: [],
};

export const kanbamSlice = createSlice({
  name: "kanbam",
  initialState,
  reducers: {
    setItemDragging: (state, action: PayloadAction<IItemDragging | null>) => {
      state.itemDragging.current = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload.trim().toLowerCase();
    },
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const id = Math.random().toString(36).substring(2, 9);
      state.toasts.push({ id, ...action.payload });
    },
    removeToast: (state, action: PayloadAction<string | undefined>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { setItemDragging, setSearchText, addToast, removeToast } =
  kanbamSlice.actions;
