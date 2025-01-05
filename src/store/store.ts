import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "../features/slices/authSlice";
import { themeReducer } from "../features/slices/themeSlice";
import { profileSlice } from "../features/slices/profileSlice";
import { kanbamSlice } from "../features/slices/kanbamSlice";
import { listsSlice } from "../features/slices/listsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    theme: themeReducer.reducer,
    profile: profileSlice.reducer,
    kanbam: kanbamSlice.reducer,
    lists: listsSlice.reducer,
  },
});

// exporting types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
