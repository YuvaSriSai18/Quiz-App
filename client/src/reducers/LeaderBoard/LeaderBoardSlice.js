import { createSlice } from "@reduxjs/toolkit";

const LeaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState: { LeaderBoardUserData: {} },
  reducers: {
    setLeaderBoardUserData(state, action) {
      state.LeaderBoardUserData = action.payload;
    },
    clearLeaderBoardUserData(state) {
      state.LeaderBoardUserData = {};
    },
  },
});

export const { setLeaderBoardUserData, clearLeaderBoardUserData } =
  LeaderBoardSlice.actions;
export default LeaderBoardSlice.reducer;
