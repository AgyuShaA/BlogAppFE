import { getCurrentUser } from "@/api/user-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../../models/user.model";
import { RootState } from "../index";

const initialState: {
  data: UserDto | null;
} = {
  data: null,
};

export const loadCurrentUser = createAsyncThunk<UserDto>(
  "user/fetchCurrentUser",
  async () => {
    const userData = await getCurrentUser();

    if (userData) {
    }

    return userData;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(loadCurrentUser.rejected, (state) => {
      state.data = null;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
