import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "../features/slices/authSlice";
import { themeReducer } from "../features/slices/themeSlice";
import { profileSlice } from "../features/slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    theme: themeReducer.reducer,
    profile: profileSlice.reducer,
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
