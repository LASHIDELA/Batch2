import { MenuCategoryMenuSlice } from "@/type/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategoryMenu: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    replaceMenuCategoryMenu: (state, action) => {
      const menuId = action.payload[0].menuId;
      const othersMenuCategoryMenu = state.items.filter(
        (item) => item.menuId !== menuId
      );
      state.items = [...othersMenuCategoryMenu, ...action.payload];
    },
  },
});

export const {
  setMenuCategoryMenu,
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
