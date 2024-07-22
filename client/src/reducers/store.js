import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authentication/authSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
