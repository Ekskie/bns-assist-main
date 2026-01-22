"use client";
import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    try {
      return token ? JSON.parse(token) : "";
    } catch (e) {
      console.error("Invalid token in localStorage:", token);
      return "";
    }
  }
  return null;
};

const authAction = createSlice({
  name: "auth",
  initialState: { token: getInitialToken() },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;

      if (accessToken) {
        localStorage.setItem("token", JSON.stringify(accessToken));
      }

      state.token = JSON.parse(localStorage.getItem("token"));
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logOut } = authAction.actions;

export const selectToken = (state) => state.auth.token;

export default authAction.reducer;
