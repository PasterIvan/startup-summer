import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { requestStatus } from "../../enums/requestStatus";

const slice = createSlice({
  name: "app",
  initialState: {
    statusApp: requestStatus.IDLE,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<requestStatus>) {
      state.statusApp = action.payload;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus } = slice.actions;
