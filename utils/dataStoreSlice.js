import { createSlice } from "@reduxjs/toolkit";

const dataStoreSlice = createSlice({
  name: "dataStore",
  initialState: {
    mainData: [],
    pengingData: [],
    inProgressData: [],
    completedData: [],
    deployedData: [],
    defferedData: [],
  },
  reducers: {
    addMainData: (state, action) => {
      state.mainData.push(action.payload);
      state.pengingData = state.mainData.filter((data) => data.status === "Pending")
    },
    updateMainData: (state, action) => {
      state.mainData = action.payload;
    },
    updatePendingData: (state, action) => {
      state.pengingData = action.payload;
    },
    updateInProgressData: (state, action) => {
      state.inProgressData = action.payload;
    },
    updateCompletedData: (state, action) => {
      state.completedData = action.payload;
    },
    updateDeployedData: (state, action) => {
      state.deployedData = action.payload;
    },
    updateDefferedData: (state, action) => {
      state.defferedData = action.payload;
    },
  },
});

export const {
  addMainData,
  updateMainData,
  updatePendingData,
  updateInProgressData,
  updateCompletedData,
  updateDeployedData,
  updateDefferedData,
} = dataStoreSlice.actions;

export default dataStoreSlice.reducer;
