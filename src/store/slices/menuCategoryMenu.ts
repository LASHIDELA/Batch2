import { MenuCategoryMenuSlice } from "@/type/menuCategoryMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    removeMenuCategoryMenu: (
      state,
      action: PayloadAction<{ menuCategoryId: number }>
    ) => {
      state.items = state.items.filter(
        (item) => item.menuCategoryId !== action.payload.menuCategoryId
      );
    },
  },
});

export const {
  setMenuCategoryMenu,
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
  removeMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
