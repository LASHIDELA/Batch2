import { MenuAddonCategorySlice } from "@/type/menuAddonCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MenuAddonCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategory: (state, action) => {
      state.items = action.payload;
    },
    addMenuAddonCategory: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    replaceMenuAddonCategory: (state, action) => {
      const addonCategoryId = action.payload[0].addonCategoryId;
      const otherMenus = state.items.filter(
        (item) => item.addonCategoryId !== addonCategoryId
      );
      state.items = [...otherMenus, ...action.payload];
    },
    removeMenuAddonCategory: (
      state,
      action: PayloadAction<{ menuId: number }>
    ) => {
      state.items = state.items.filter(
        (item) => item.menuId !== action.payload.menuId
      );
    },
  },
});

export const {
  setMenuAddonCategory,
  addMenuAddonCategory,
  replaceMenuAddonCategory,
  removeMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
