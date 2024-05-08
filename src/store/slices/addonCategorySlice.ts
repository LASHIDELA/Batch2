import {
  AddonCategorySlice,
  CreateAddonCategory,
  RemoveAddonCategory,
  UpdateAddonCategory,
} from "@/type/addonCategory";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMenuAddonCategory,
  replaceMenuAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (options: CreateAddonCategory, thunkApi) => {
    const { name, menuIds, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addonCategory`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, menuIds }),
      });
      const { newAddonCategory, newMenuAddonCategories } =
        await response.json();
      thunkApi.dispatch(addAddonCategory(newAddonCategory));
      thunkApi.dispatch(addMenuAddonCategory(newMenuAddonCategories));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const updateAddonCategories = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (options: UpdateAddonCategory, thunkApi) => {
    const { name, id, isRequired, menuIds, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addonCategory`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, id, isRequired, menuIds }),
      });
      const { updateAddonCategory, updateMenuAddonCategories } =
        await response.json();

      thunkApi.dispatch(replaceAddonCategory(updateAddonCategory));
      thunkApi.dispatch(replaceMenuAddonCategory(updateMenuAddonCategories));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const removeAddonCategories = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (options: RemoveAddonCategory, thunkApi) => {
    const { id, onSuccess, onError } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/addonCategory?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(removeAddonCategory({ id }));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategory: (state, action) => {
      state.items = action.payload;
    },
    addAddonCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceAddonCategory: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setAddonCategory,
  addAddonCategory,
  replaceAddonCategory,
  removeAddonCategory,
} = addonCategorySlice.actions;
export default addonCategorySlice.reducer;
