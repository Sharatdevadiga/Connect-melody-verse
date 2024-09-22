import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("auth")) || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    markAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user || null;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    unmarkAuthenticated: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("auth");
    },
  },
});

export const { markAuthenticated, unmarkAuthenticated } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
