// import { CartInitial } from "@/type/cart";
import { CartItem } from "@/type/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface CartInitial {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
const initialState: CartInitial = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      state.items = action.payload;
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const exit = state.items.find((item) => item.id === action.payload.id);
      if (exit) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCartItem: (state, action) => {
      state.items = [];
    },
  },
});

export const { setCartItem, addCartItem, removeCartItem, emptyCartItem } =
  cartSlices.actions;
export default cartSlices.reducer;
