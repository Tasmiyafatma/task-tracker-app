import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    newTaskModal: false,
    editTaskModal: false,
    deleteTaskModal: false
  },
  reducers: {
    showHideNewTaskModal: (state, action) => {
        state.newTaskModal = action.payload;
    },
    showHideEditTaskModal: (state, action) => {
        state.editTaskModal = action.payload;
    },
    showHideDeleteTaskModal: (state, action) => {
        state.deleteTaskModal = action.payload;
    }
  },
});

export const { showHideNewTaskModal, showHideEditTaskModal, showHideDeleteTaskModal } = modalSlice.actions;

export default modalSlice.reducer;
