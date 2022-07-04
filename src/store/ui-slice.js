import { createSlice } from "@reduxjs/toolkit";

const initialState = { showModal: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeShowModal: (state, action) => {
      state.showModal = !state.showModal;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducers = uiSlice.reducer;
