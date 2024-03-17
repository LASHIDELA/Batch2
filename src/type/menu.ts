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

export interface MenuPayLoad extends BaseOption {
  name: string;
  price: number;
  menuCategoryId: number[];
}

export interface UpdateMenu extends BaseOption {
  id: number;
  name?: string;
  price?: number;
  menuCategoryId: number[];
}
export interface DeleteMenu extends BaseOption {
  id: number;
}
