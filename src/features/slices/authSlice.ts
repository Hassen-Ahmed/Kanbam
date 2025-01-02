import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type accessTokenType = string | null;

interface IAuth {
  accessToken: accessTokenType;
}

const initialState: IAuth = {
  accessToken: null,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAsscessToken: (state, action: PayloadAction<accessTokenType>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAsscessToken } = authReducer.actions;
