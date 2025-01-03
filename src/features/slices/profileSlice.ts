import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileThunk } from "../thunks/profileThunk";

export type statusType = "idle" | "loading" | "failed";

interface IInitialState {
  status: statusType;
  profile: {
    email: string;
    userName: string;
  };
}

const initialState: IInitialState = {
  status: "idle",
  profile: {
    email: "",
    userName: "",
  },
};

type profileType = typeof initialState.profile;

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<profileType>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.profile = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setProfile } = profileSlice.actions;
