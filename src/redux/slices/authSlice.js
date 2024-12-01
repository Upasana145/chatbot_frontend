import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  token: null,
  role: null,
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.value = true;
      state.role = action?.payload?.data[0]?.role;
      state.username = action?.payload?.data[0]?.username;
    },
    logoutHandler: (state) => {
      state.value = false;
      state.role = null;
      state.username = null;
    },
    tokenHandler: (state, action) => {
      state.token = action.payload; // Set the token with the payload value
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginHandler, logoutHandler, tokenHandler } = authSlice.actions;

export default authSlice.reducer;
