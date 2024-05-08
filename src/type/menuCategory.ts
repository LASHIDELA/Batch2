import { Menucategory } from "@prisma/client";
import { BaseOption } from "./app";

export interface MenuCategorySlice {
  items: Menucategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetMenuCategoryOption extends BaseOption {
  name: string;
  locationId: number;
}

export interface CreateMenuCategoryOption extends BaseOption {
  name: string;
  companyId: number;
}
export interface UpdateMenuCategoryOption extends BaseOption {
  id: number;
  name: string;
  locationId: number;
  isAvalible: boolean;
}
export interface DeleteMenuCategoryOption extends BaseOption {
  id: number;
}
