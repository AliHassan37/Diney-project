import { TabState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TabState = {
  tab: "chat",
};

export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
  },
});

const tabReducer = tabSlice.reducer;

export const tabActions = tabSlice.actions;
export default tabReducer;
