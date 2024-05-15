import {
  DeleteMenuCategoryOption,
  GetMenuCategoryOption,
  MenuCategorySlice,
  UpdateMenuCategoryOption,
} from "@/type/menuCategory";
import { config } from "@/utils/config";
import { Menucategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDisableLocationMenuCategory,
  removeDisableLocationMenuCategory,
} from "./disableLocationMenuCategorySlice";
import { removeMenuCategoryMenu } from "./menuCategoryMenu";

const initialState: MenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchMenuCategory = createAsyncThunk(
  "menuCategory/fetchMenucategory",
  async (payloadOption: GetMenuCategoryOption, thunkApi) => {
    const { name, locationId, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(`${config.apiBackOfficeUrl}/menu-category`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const menuCategories = await response.json();
      thunkApi.dispatch(addMenuCategory(menuCategories));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payloadOption: GetMenuCategoryOption, thunkApi) => {
    const { name, locationId, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(`${config.apiBackOfficeUrl}/menu-category`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const { menuCategories } = await response.json();
      thunkApi.dispatch(addMenuCategory(menuCategories));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const updateMenuCategory = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async (payloadOption: UpdateMenuCategoryOption, thunkApi) => {
    const { name, id, locationId, isAvalible, onSuccess, onError } =
      payloadOption;
    try {
      const response = await fetch(`${config.apiBackOfficeUrl}/menu-category`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, id, locationId, isAvalible }),
      });
      const { updateMenuCategory, disableLocationMenuCategory } =
        await response.json();
      thunkApi.dispatch(replaceMenuCategory(updateMenuCategory));
      if (isAvalible === false) {
        thunkApi.dispatch(
          addDisableLocationMenuCategory(disableLocationMenuCategory)
        );
      }
      if (isAvalible === true) {
        thunkApi.dispatch(
          removeDisableLocationMenuCategory({ locationId, menuCategoryId: id })
        );
      }
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteMenuCategory = createAsyncThunk(
  "menuCategory/deleteMenuCategory",
  async (payloadOption: DeleteMenuCategoryOption, thunkApi) => {
    const { id, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(
        `${config.apiBackOfficeUrl}/menu-category?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(removeMenuCategory({ id }));
      thunkApi.dispatch(removeMenuCategoryMenu({ menuCategoryId: id }));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategory: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceMenuCategory: (state, action: PayloadAction<Menucategory>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenuCategory: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setMenuCategory,
  addMenuCategory,
  replaceMenuCategory,
  removeMenuCategory,
} = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
