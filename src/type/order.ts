import { Order } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface OrderSlice {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetOrderOption extends BaseOption {}
