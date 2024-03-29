import { createSlice } from "@reduxjs/toolkit";

const deleteData = createSlice({
  name: "deleteData",
  initialState: {
    data: null,
  },
  reducers: {
    storeDeleteData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeDeleteData } = deleteData.actions;

export default deleteData.reducer;
