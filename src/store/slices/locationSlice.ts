import { LocationSlice, PayloadOption } from "@/type/location";
import { config } from "@/utils/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  items: [],
  setLocation: null,
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (option: PayloadOption, thunApi) => {
    const { name, street, townShip, companyId, city, onError, onSuccess } =
      option;
    try {
      const response = await fetch(`${config.apiBackOfficeUrl}/location`, {
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
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
      const selectedLocaiotnId = localStorage.getItem("LocationId");

      if (!selectedLocaiotnId) {
        const defaultLocation = String(action.payload[0].id);
        localStorage.setItem("LocationId", defaultLocation);
        state.setLocation = action.payload[0];
      } else {
        const selectedLocation = state.items.find(
          (item) => item.id === Number(selectedLocaiotnId)
        );
        if (selectedLocation) {
          state.setLocation = selectedLocation;
        }
      }
    },
    setChangeLocation: (state, action: PayloadAction<Location>) => {
      state.setLocation = action.payload;
    },
    addLocation: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setLocation, addLocation, setChangeLocation } =
  locationSlices.actions;
export default locationSlices.reducer;
