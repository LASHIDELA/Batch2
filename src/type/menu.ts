import { Menu } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface MenuSlice {
  items: Menu[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetMenuOption extends BaseOption {}
