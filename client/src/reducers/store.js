import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authentication/authSlice";
import LeaderBoardSlice from "./LeaderBoard/LeaderBoardSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    LeaderBoard: LeaderBoardSlice,
  },
});
