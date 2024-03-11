import { AddonSlice } from "@/type/addon";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddonSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setAddon } = addonSlice.actions;
export default addonSlice.reducer;
