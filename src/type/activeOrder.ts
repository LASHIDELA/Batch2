import { BaseOption } from "./app";
import { CartItem } from "./cart";

export interface CartSlice {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateCartOptions extends BaseOption {
  tableId: number;
  cartItem: CartItem;
}
