import { Addon, Menu, Order, OrderStatus, Table } from "@prisma/client";
import { CartItem } from "./cart";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface OrderSlice {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateOrderOption extends BaseOption {
  tableId: number;
  cartItem: CartItem[];
}

export interface UpdateOrderStatus extends BaseOption {
  itemId: string;
  orderStatus: OrderStatus;
}

export interface OrderAddons {
  addonCategoryId: number;
  addons: Addon[];
}

export interface OrderItem extends BaseOption {
  itemId: string;
  menus: Menu;
  table: Table;
  orderAddons: OrderAddons[];
  orderStatus: OrderStatus;
}
export interface RefreshOrder extends BaseOption {
  orderSeq: string;
}
