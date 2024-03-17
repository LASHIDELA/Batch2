import { LocationSlice, PayloadOption } from "@/type/location";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (option: PayloadOption, thunApi) => {
    const { name, address, onError, onSuccess } = option;
    console.log(option);
    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(option),
      });
      const { location } = await response.json();
      thunApi.dispatch(addLocation(location));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
const locationSlices = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.items = action.payload;
    },
    addLocation: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setLocation, addLocation } = locationSlices.actions;
export default locationSlices.reducer;
