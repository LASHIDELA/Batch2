import { LocationSlice } from "@/type/location";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const locationSlices = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setLocation } = locationSlices.actions;
export default locationSlices.reducer;
