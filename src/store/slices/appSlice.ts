import { AppSlice, GetAppOption } from "@/type/app";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddonCategory } from "./addonCategorySlice";
import { setAddon } from "./addonSlice";
import { setCompany } from "./companySlice";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategorySlice";
import { setDisableLocationMenu } from "./disableLocationMenuSlice";
import { setLocation } from "./locationSlice";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenu";
import { setMenuCategory } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setOrder } from "./orderSlice";
import { setTable } from "./tableSlice";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (option: GetAppOption, thunkApi) => {
    const { onSuccess, onError, tableId } = option;
    try {
      const appDataUrl = tableId
        ? `${config.apiOrderUrl}/app?tableId=${tableId}`
        : `${config.apiBackOfficeUrl}/app`;
      const response = await fetch(appDataUrl);
      const {
        tables,
        menuCategories,
        menus,
        addonCategories,
        addons,
        locations,
        menuAddonCategory,
        menuCategoryMenu,
        orders,
        company,
        disableLocationMenuCategory,
        disableLocationMenu,
      } = await response.json();
      thunkApi.dispatch(setMenuCategory(menuCategories));
      thunkApi.dispatch(setMenu(menus));
      thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenu));
      thunkApi.dispatch(setAddonCategory(addonCategories));
      thunkApi.dispatch(setMenuAddonCategory(menuAddonCategory));
      thunkApi.dispatch(setAddon(addons));
      thunkApi.dispatch(setTable(tables));
      thunkApi.dispatch(setLocation(locations));
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setDisableLocationMenu(disableLocationMenu));
      thunkApi.dispatch(
        setDisableLocationMenuCategory(disableLocationMenuCategory)
      );
      thunkApi.dispatch(setOrder(orders));
      thunkApi.dispatch(setCompany(company));
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
