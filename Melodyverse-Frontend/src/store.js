import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reduxSlice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
