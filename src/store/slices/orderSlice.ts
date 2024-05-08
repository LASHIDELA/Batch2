import {
  CreateOrderOption,
  OrderSlice,
  RefreshOrder,
  UpdateOrderStatus,
} from "@/type/order";
import { config } from "@/utils/config";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: OrderSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "Order/CreateOrder",
  async (payloadOption: CreateOrderOption, thunkApi) => {
    const { tableId, cartItem, onSuccess, onError } = payloadOption;
    try {
      const response = await fetch(`${config.apiBaseUrl}/active-order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItem }),
      });
      const { orders } = await response.json();
      thunkApi.dispatch(setOrder(orders));
      onSuccess && onSuccess(orders);
    } catch (error) {
      onError && onError();
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "updateOrderStatus/order",
  async (payloadAction: UpdateOrderStatus, thunkapi) => {
    const { itemId, orderStatus, onError, onSuccess } = payloadAction;
    try {
      const response = await fetch(`${config.apiBaseUrl}/active-order`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ itemId, orderStatus }),
      });
      const { orders } = await response.json();

      thunkapi.dispatch(setOrder(orders));
    } catch (error) {}
  }
);
export const refreshOrders = createAsyncThunk(
  "order/refreshOrder",
  async (options: RefreshOrder, thunkApi) => {
    const { orderSeq, onSuccess, onError } = options;

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/active-order?orderSeq=${orderSeq}`
      );
      const { orders } = await response.json();

      thunkApi.dispatch(setOrder(orders));
    } catch (error) {}
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
