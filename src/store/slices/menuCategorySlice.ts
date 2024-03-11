import { GetMenuCategoryOption, MenuCategorySlice } from "@/type/menuCategory";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
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
  },
});

export const { setMenuCategory, addMenuCategory } = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
