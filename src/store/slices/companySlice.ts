import { CompanyOption, UpdateCompanyOptions } from "@/type/company";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CompanyOption = {
  item: null,
  isLoading: false,
  error: null,
};

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (payloadOption: UpdateCompanyOptions, thunkApi) => {
    const { id, name, street, townShip, city, onSuccess, onError } =
      payloadOption;
    try {
      const response = await fetch(`${config.apiBaseUrl}/company`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, street, townShip, city }),
      });
      const { updateCompany } = await response.json();
      thunkApi.dispatch(setCompany(updateCompany));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
