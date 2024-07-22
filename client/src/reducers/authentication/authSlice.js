import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: { userData: {} },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.userData = {};
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
