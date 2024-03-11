import { AddonCategorySlice } from "@/type/addonCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddonCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategory: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setAddonCategory } = addonCategorySlice.actions;
export default addonCategorySlice.reducer;
