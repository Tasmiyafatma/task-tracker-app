import { createSlice } from "@reduxjs/toolkit";

const editData = createSlice({
  name: "editData",
  initialState: {
    data: null,
  },
  reducers: {
    storeEditData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeEditData } = editData.actions;

export default editData.reducer;
