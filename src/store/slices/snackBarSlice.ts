import { SnackBar } from "@/type/SnackBar";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SnackBar = {
  open: false,
  message: null,
  autoHideDuration: 3000,
  severity: "success",
};
const createSnackBar = createSlice({
  name: "createSnackBar",
  initialState,
  reducers: {
    setOpenSnackBar: (state, action) => {
      const {
        message,
        severity = "success",
        autoHideDuration = 3000,
      } = action.payload;
      state.severity = severity;
      state.autoHideDuration = autoHideDuration;
      state.message = message;
      state.open = true;
    },
    setCloseSnackBar: (state) => {
      state.autoHideDuration = 3000;
      state.message = null;
      state.open = false;
      state.severity = "success";
    },
  },
});
export const { setOpenSnackBar, setCloseSnackBar } = createSnackBar.actions;
export default createSnackBar.reducer;
