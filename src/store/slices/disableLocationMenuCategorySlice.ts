import { DisableLocationMenuCategorySlice } from "@/type/disableLocationMenuCategory";
import { DisableLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisableLocationMenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const disableLocationMenuCategory = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setDisableLocationMenuCategory: (state, action) => {
      state.items = action.payload;
    },
    addDisableLocationMenuCategory: (
      state,
      action: PayloadAction<DisableLocationMenuCategory>
    ) => {
      const exite = state.items.find(
        (item) =>
          item.menuCategoryId === action.payload.menuCategoryId &&
          item.locationId === action.payload.locationId
      )
        ? true
        : false;

      if (!exite) {
        state.items = [...state.items, action.payload];
      }
    },
    removeDisableLocationMenuCategory: (
      state,
      action: PayloadAction<{ locationId: number; menuCategoryId: number }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.menuCategoryId === action.payload.menuCategoryId &&
            item.locationId === action.payload.locationId
          )
      );
    },
  },
});

export const {
  setDisableLocationMenuCategory,
  removeDisableLocationMenuCategory,
  addDisableLocationMenuCategory,
} = disableLocationMenuCategory.actions;
export default disableLocationMenuCategory.reducer;
