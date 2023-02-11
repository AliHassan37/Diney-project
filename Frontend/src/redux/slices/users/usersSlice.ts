import { UserState } from ".";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: null,
  users: [],
  roomUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
export default userReducer;
