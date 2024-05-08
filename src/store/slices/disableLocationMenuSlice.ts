import { DisableLocationMenuSlice } from "@/type/disableLocationMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisableLocationMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const disableLocationMenu = createSlice({
  name: "disableLocationMenu",
  initialState,
  reducers: {
    setDisableLocationMenu: (state, action) => {
      state.items = action.payload;
    },
    addDisableLocationMenu: (state, action) => {
      const exit = state.items.find(
        (item) =>
          item.menuId === action.payload.menuId &&
          item.locationId === action.payload.locationId
      )
        ? true
        : false;
      if (!exit) {
        state.items = [...state.items, ...action.payload];
      }
    },
    removeDisableLocationMenu: (
      state,
      action: PayloadAction<{ locationId: number; menuId: number }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.menuId == action.payload.menuId &&
            item.locationId == action.payload.locationId
          )
      );
    },
  },
});

export const {
  setDisableLocationMenu,
  removeDisableLocationMenu,
  addDisableLocationMenu,
} = disableLocationMenu.actions;
export default disableLocationMenu.reducer;
