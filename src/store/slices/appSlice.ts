import { AppSlice, GetAppOption } from "@/type/app";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddonCategory } from "./addonCategorySlice";
import { setAddon } from "./addonSlice";
import { setLocation } from "./locationSlice";
import { setMenuCategory } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setTable } from "./tableSlice";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (option: GetAppOption, thunkApi) => {
    const { onSuccess, onError } = option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/app`);
      const {
        tables,
        menuCategories,
        menus,
        addonCategories,
        addons,
        locations,
      } = await response.json();
      thunkApi.dispatch(setMenuCategory(menuCategories));
      thunkApi.dispatch(setMenu(menus));
      thunkApi.dispatch(setAddonCategory(addonCategories));
      thunkApi.dispatch(setAddon(addons));
      thunkApi.dispatch(setTable(tables));
      thunkApi.dispatch(setLocation(locations));
      thunkApi.dispatch(setInit(true));

      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;
export default appSlice.reducer;
