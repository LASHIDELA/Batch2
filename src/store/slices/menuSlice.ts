import { DeleteMenu, MenuPayLoad, MenuSlice, UpdateMenu } from "@/type/menu";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDisableLocationMenu,
  removeDisableLocationMenu,
} from "./disableLocationMenuSlice";
import { removeMenuAddonCategory } from "./menuAddonCategorySlice";
import {
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} from "./menuCategoryMenu";

const initialState: MenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (options: MenuPayLoad, thunkApi) => {
    const { name, assetUrl, price, menuCategoryId, onSuccess, onError } =
      options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, assetUrl, price, menuCategoryId }),
      });
      const { newMenu, newMenuCategoryMenu } = await response.json();
      thunkApi.dispatch(addMenu(newMenu));
      thunkApi.dispatch(addMenuCategoryMenu(newMenuCategoryMenu));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const upDateMenu = createAsyncThunk(
  "menu/upDateMenu",
  async (options: UpdateMenu, thunkApi) => {
    const {
      id,
      name,
      price,
      menuCategoryId,
      locationId,
      isAvailable,
      assetUrl,
      onSuccess,
      onError,
    } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          price,
          menuCategoryId,
          locationId,
          isAvailable,
          assetUrl,
        }),
      });
      const { updateMenus, updateMenuCategoryMenu, disableLocationMenus } =
        await response.json();
      thunkApi.dispatch(replaceMenu(updateMenus));
      thunkApi.dispatch(replaceMenuCategoryMenu(updateMenuCategoryMenu));
      if (isAvailable === false) {
        thunkApi.dispatch(addDisableLocationMenu(disableLocationMenus));
      }
      if (isAvailable === true) {
        thunkApi.dispatch(
          removeDisableLocationMenu({ locationId, menuId: id })
        );
      }
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/upDateMenu",
  async (options: DeleteMenu, thunkApi) => {
    const { id, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeMenu({ id }));
      thunkApi.dispatch(removeMenuAddonCategory({ menuId: id }));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.items = action.payload;
    },
    addMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceMenu: (state, action) => {
      state.items = state.items.map((item) =>
        item.id !== action.payload.id ? item : action.payload
      );
    },
    removeMenu: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setMenu, addMenu, replaceMenu, removeMenu } = menuSlice.actions;
export default menuSlice.reducer;
