import {
  CreateTableOptions,
  DeleteTableOptions,
  TableSlice,
  UpdateTableOptions,
} from "@/type/table";
import { config } from "@/utils/config";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TableSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "Table/CreateTable",
  async (payloadOption: CreateTableOptions, thunkApi) => {
    const { name, locationId, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(`${config.apiBackOfficeUrl}/table`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const { newTable } = await response.json();
      thunkApi.dispatch(addTable(newTable));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (payloadOption: UpdateTableOptions, thunkApi) => {
    const { name, id, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(`${config.apiBackOfficeUrl}/table`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, id }),
      });
      const { updateTable } = await response.json();
      thunkApi.dispatch(replaceTable(updateTable));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (payloadOption: DeleteTableOptions, thunkApi) => {
    const { id, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(
        `${config.apiBackOfficeUrl}/table?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(removeTable({ id }));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTable: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setTable, addTable, replaceTable, removeTable } =
  tableSlice.actions;
export default tableSlice.reducer;
