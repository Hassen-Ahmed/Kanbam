import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserResponseDetail } from "../../types/kanbam";
import { kanbamApi } from "../../utils/api/baseApi";

export const fetchProfileThunk = createAsyncThunk(
  "profile/fetchProfile",
  async (userId: string) => {
    const {
      data: { user },
    } = await kanbamApi.get<{
      user: IUserResponseDetail;
    }>(`/Users/${userId}`);

    return user;
  }
);
