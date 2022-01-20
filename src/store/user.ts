import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import userApi from "./api/user";
import { User } from "./types";

const initialState: User = { email: null, name: null, token: null };

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      return action.payload
    },
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
