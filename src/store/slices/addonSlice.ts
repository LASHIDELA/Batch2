import {
  AddonSlice,
  CreateAddonOption,
  RemoveAddonOption,
  UpdateAddonOption,
} from "@/type/addon";
import { config } from "@/utils/config";
import { Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AddonSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (options: CreateAddonOption, thunkApi) => {
    const { name, price, addonCategoryId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, price, addonCategoryId }),
      });
      const { newAddon } = await response.json();
      thunkApi.dispatch(addAddon(newAddon));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (options: UpdateAddonOption, thunkApi) => {
    const { id, name, price, addonCategoryId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, price, addonCategoryId }),
      });
      const { updateAddon } = await response.json();
      thunkApi.dispatch(replaceAddon(updateAddon));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const removeAddons = createAsyncThunk(
  "addon/updateAddon",
  async (options: RemoveAddonOption, thunkApi) => {
    const { id, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeAddon({ id }));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action) => {
      state.items = action.payload;
    },
    addAddon: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddon: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setAddon, addAddon, replaceAddon, removeAddon } =
  addonSlice.actions;
export default addonSlice.reducer;
