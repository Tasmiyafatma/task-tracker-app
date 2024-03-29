import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import editDataSlice from "./editDataSlice";
import dataStoreSlice from "./dataStoreSlice";
import deleteDataSlice from "./deleteDataSlice";

const appStore = configureStore({
  reducer: {
    dataStore: dataStoreSlice,
    modal: modalSlice,
    editData: editDataSlice,
    deleteData: deleteDataSlice
  },
});

export default appStore;
