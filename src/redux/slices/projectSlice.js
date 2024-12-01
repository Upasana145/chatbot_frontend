import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectTypeHandler: (state, action) => {
      state.value = action.payload.value;
    },
    initialProjectTypeHandler: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { projectTypeHandler, initialProjectTypeHandler } =
  projectSlice.actions;

export default projectSlice.reducer;
